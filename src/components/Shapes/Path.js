import React from 'react';
import ToolTip from './ToolTip';
//import {G, Path as Path1} from 'react-native-svg';
import { Svg } from 'expo';
const {G, Path:Path1 } = Svg;

export default class Path extends React.Component{
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

    getSVGPath(rawPoints){
        let svgPath = 'M '+rawPoints[0].x+' '+rawPoints[0].y;
        let len = rawPoints.length;
        if(len < 2){
            return null;
        }
        for(let i=1; i<len; i++){
            svgPath = svgPath + ' L' + rawPoints[i].x + ' ' + rawPoints[i].y;
        }
        return svgPath;
    }

    renderShape(){
        let {style, points} = this.props.attributes;
        let d = this.getSVGPath(points);
        if(d == null){
            return null;
        }
        let {showToolTip, name, showOverlay, drawingId} = this.props;
        if(showToolTip){
            return (
                <G> 
                    <Path1 fill="none" strokeWidth={style.strokeWidth} stroke={style.stroke} strokeDasharray={style.strokeDasharray} d={d}/>
                    <ToolTip name={name} x={points[points.length-1].x} y={points[points.length-1].y}/>
                </G>
            );
        }
        if(showOverlay){
            let styleOverlay = {...style, strokeWidth:'10', strokeLinecap:'round'};
            return (
                <G> 
                    {this.state.mouseOverMe && <Path1 fill="none" strokeWidth={styleOverlay.strokeWidth} stroke={styleOverlay.stroke} strokeLinecap={'round'} strokeOpacity={0.5} strokeDasharray={styleOverlay.strokeDasharray} d={d}/>}
                    <Path1 fill="none" strokeWidth={style.strokeWidth} stroke={style.stroke} strokeDasharray={style.strokeDasharray} d={d}/>
                    <Path1 onPressIn={()=>{this.mouseEntered()}} onPressOut={()=>{this.mouseOut(); this.props.removeDrawing(drawingId);}}
                        fill="none" strokeWidth={styleOverlay.strokeWidth} stroke={styleOverlay.stroke} strokeLinecap={'round'} strokeOpacity={0} strokeDasharray={''} d={d}/>
                </G>
            );
        }
        return(<Path1 fill="none" strokeWidth={style.strokeWidth} stroke={style.stroke} strokeDasharray={style.strokeDasharray} d={d}/>);
    }

    render(){
        return this.renderShape();
    }
} 