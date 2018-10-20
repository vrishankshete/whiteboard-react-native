import React from 'react';
import ToolTip from './ToolTip';
import { Svg } from 'expo';
const { Rect, G } = Svg;

export default class Rectangle extends React.Component{
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
        let {style, width, height, x, y} = this.props.attributes;
        let {showToolTip, name, showOverlay, drawingId} = this.props;
        if(showToolTip){
            return (
                <G> 
                    <Rect fill='none' strokeWidth={style.strokeWidth} stroke={style.stroke} width={width} height={height} x={x} y={y}/>
                    <ToolTip name={name} x={x} y={y}/>
                </G>
            );
        }
        if(showOverlay){
            let styleOverlay = {...style, strokeWidth:'10'};
            return (
                <G> 
                    {this.state.mouseOverMe?<Rect fill='none' strokeWidth={styleOverlay.strokeWidth} stroke={styleOverlay.stroke} strokeOpacity={0.5} width={width} height={height} x={x} y={y}/>:''}
                    <Rect fill='none' strokeWidth={style.strokeWidth} stroke={style.stroke} width={width} height={height} x={x} y={y}/>
                    <Rect onPressIn={()=>this.mouseEntered()} onPressOut={()=>{this.mouseOut(); this.props.removeDrawing(drawingId);}}
                        fill='none' strokeWidth={styleOverlay.strokeWidth} stroke={styleOverlay.stroke} strokeOpacity={0} width={width} height={height} x={x} y={y}/>
                </G>
            );
        }
        return(<Rect fill='none' strokeWidth={style.strokeWidth} stroke={style.stroke} width={width} height={height} x={x} y={y}/> );
    }
    render(){
        return this.renderShape();
    }
}