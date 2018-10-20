import React from 'react';
import ToolTip from './ToolTip';
//import {G, Ellipse as Ellipse1} from 'react-native-svg';
import { Svg } from 'expo';
const { G, Ellipse:Ellipse1 } = Svg;

export default class Ellipse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mouseOverMe:false
        }
    }
    mouseEntered(){
        this.setState({mouseOverMe:true});
    }
    mouseOut(){
        this.setState({mouseOverMe:false});
    }

    renderShape(){
        let {style, cx, cy, rx, ry} = this.props.attributes;        
        let {showToolTip, name, showOverlay, drawingId} = this.props;
        if(showToolTip){
            return (
                <G> 
                    <Ellipse1 fill="none" strokeWidth={style.strokeWidth} stroke={style.stroke} cx={cx} cy={cy} rx={rx} ry={ry}/>
                    <ToolTip name={name} x={cx} y={cy}/>
                </G>
            );
        }
        if(showOverlay){
            let styleOverlay = {...style, strokeWidth:'10'};
            return (
                <G> 
                    {this.state.mouseOverMe && <Ellipse1 fill="none" strokeWidth={styleOverlay.strokeWidth} stroke={styleOverlay.stroke} strokeOpacity={0.5} cx={cx} cy={cy} rx={rx} ry={ry}/>}
                    <Ellipse1 fill="none" strokeWidth={style.strokeWidth} stroke={style.stroke} cx={cx} cy={cy} rx={rx} ry={ry}/>
                    <Ellipse1 onPressIn={()=>{this.mouseEntered()}} onPressOut={()=>{this.mouseOut(); this.props.removeDrawing(drawingId);}}
                        fill="none" strokeWidth={styleOverlay.strokeWidth} stroke={styleOverlay.stroke} strokeOpacity={0} cx={cx} cy={cy} rx={rx} ry={ry}/>
                </G>
            );
        }
        return(<Ellipse1 fill="none" strokeWidth={style.strokeWidth} stroke={style.stroke} cx={cx} cy={cy} rx={rx} ry={ry}/>);
    }
    render(){
        return this.renderShape();
    }
} 