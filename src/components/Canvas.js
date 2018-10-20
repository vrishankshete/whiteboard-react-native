import React from 'react';
import {connect} from 'react-redux';
import { View, Dimensions} from 'react-native';
import Shape from './Shapes/Shape';
import helper from './Shapes/ShapeHelper';
import { Svg } from 'expo';
import { canvasStyles } from '../styles/styles';
const {width,height} = Dimensions.get('window');

class Canvas extends React.Component{
    constructor(props){
        super(props);
        this.penDown = false;
        this.shape = {
            type:'',
            attributes:{
                style:{}
            }
        };
        this.cursors = {};
        this.drawings = [];
        this.state = {
            drawings:[],
            cursors:{},
            shape: this.shape
        }
    }

    componentDidMount(){
        this.bindSocketEvents();
        this.props.socket.emit("room id", this.props.roomId);
        this.props.socket.emit("submit name", this.props.name);
    }

    bindSocketEvents(){
        this.props.socket.on('cursorStart', (msg)=>{
            this.cursors = {...this.cursors, [msg.name]:msg.drawingData}
            this.setState({cursors:this.cursors});
        });
        this.props.socket.on('updateCursor',(msg)=>{
            this.cursors[msg.name] = msg.drawingData;
            this.setState({cursors:this.cursors});
        });
        this.props.socket.on('addDrawing', (msg)=>{
            this.drawings = [...this.drawings, msg];
            this.setState({drawings:this.drawings});
            delete this.cursors[msg.name];
            this.setState({cursors:this.cursors});
        });
        this.props.socket.on('removeDrawing', (drawingId)=>{
            this.drawings = this.drawings.filter(drawing=>drawing.drawingId !== drawingId);
            this.setState({drawings:this.drawings});     
        });
        this.props.socket.on('initDrawings',(msg)=>{
            this.drawings = msg;
            this.setState({drawings:this.drawings});
            
        });
        this.props.socket.on('clearAll',()=>{
            this.drawings = [];
            this.setState({drawings:this.drawings});
            
        });
    }

    removeDrawing(drawingId){
        this.props.socket.emit("removeDrawing", drawingId);   
    }

    getCommonSVGStyle(e){
        let svgStyle = {};
        svgStyle.strokeWidth='2';
        (e.which === 3)?svgStyle.stroke='red':svgStyle.stroke='white';
        switch(this.props.selectedTool){
            case 'pencil':
                svgStyle.strokeDasharray='5,5';
            break;
            case 'eraser':
                svgStyle.stroke='black';
                svgStyle.strokeWidth='5';   
            break;
            default:
            break;
        }
        svgStyle.fill='none';
        return svgStyle;
    }

    svgMouseDown(e){
        if(this.props.selectedTool === 'remove') return;
        this.penDown = true;
        let style = this.getCommonSVGStyle(e);
        helper[this.props.selectedTool].penDown({x:e.nativeEvent.locationX,y:e.nativeEvent.locationY});
        this.shape = {
            type:this.props.selectedTool,
            attributes:{
                style,
                ...helper[this.props.selectedTool].initialValues
            }
        };
        this.props.socket.emit('cursorStart', this.shape);
        this.setState({shape:this.shape});
    }
    svgMouseMove(e){
        if(this.penDown){
            let attr;
            attr = helper[this.props.selectedTool].getAttributes(e.nativeEvent.locationX,e.nativeEvent.locationY);

            this.shape = {
                type:this.shape.type,
                attributes:{
                    style:this.shape.attributes.style,
                    ...attr
                }
            };
            this.setState({shape: this.shape});
            this.props.socket.emit('updateCursor', this.shape);
        }
    }
    svgMouseUp(e){
        if(this.penDown){
            this.penDown = false;
            if(helper[this.props.selectedTool].penUp){
                let attr = helper[this.props.selectedTool].penUp();
                this.shape = {
                    type:this.shape.type,
                    attributes:{
                        style:this.shape.attributes.style,
                        ...attr
                    }
                };
            }
            this.props.socket.emit('addDrawing', this.shape);
            this.shape = {
                type:'',
                attributes:{
                    style:{}
                }
            };
            this.setState({shape: this.shape});
        }
    }
    renderCursors(){
        let constArr = [];
        let cursors = this.state.cursors;
        for (const cursor in cursors) {
            constArr.push(<Shape key={cursor} showToolTip={true} name={cursor} shape={cursors[cursor]}/>);
        }
        return constArr;
    }
    render(){
        return (
            <View style={canvasStyles.container}
                onStartShouldSetResponder={(e) => {this.svgMouseDown(e);return this.props.selectedTool=='remove'?false:true}}
                onMoveShouldSetResponder={(e) => {return this.props.selectedTool=='remove'?false:true}}
                onResponderMove={(e)=>this.svgMouseMove(e)}
                onResponderRelease={(e)=>this.svgMouseUp(e)}>
                <Svg height={height} width={width} >
                    {
                        this.state.drawings.map(drawing=><Shape key={drawing.drawingId}
                            removeDrawing={this.removeDrawing.bind(this)} 
                            drawingId={drawing.drawingId} 
                            showOverlay={this.props.selectedTool==='remove'?true:false}
                            shape={drawing.drawingData}
                        />)
                    }
                    {
                        this.renderCursors()
                    }
                    <Shape showToolTip={false} shape={this.state.shape}/>
                </Svg>
            </View>
        );
    }
}

const mapStateToProos = (rootState) => {
    return {
        selectedTool: rootState.sidebar.selectedTool,
        roomId: rootState.home.roomId,
        name: rootState.home.name
    }
}
const mapDispatchToProps = null;
export default connect(mapStateToProos, mapDispatchToProps)(Canvas);