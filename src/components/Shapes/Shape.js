import React from 'react';
import Rectangle from './Rectangle';
import Ellipse from './Ellipse';
import Line from './Line';
import Path from './Path';

export default class Shape extends React.Component{

    renderShape(){
        switch(this.props.shape.type) {
            case 'rectangle': 
            return <Rectangle removeDrawing={this.props.removeDrawing} 
                        drawingId={this.props.drawingId} 
                        showOverlay={this.props.showOverlay} 
                        showToolTip={this.props.showToolTip} 
                        name={this.props.name} 
                        attributes={this.props.shape.attributes}/>

            case 'ellipse': 
            return <Ellipse removeDrawing={this.props.removeDrawing} 
                        drawingId={this.props.drawingId} 
                        showOverlay={this.props.showOverlay} 
                        showToolTip={this.props.showToolTip} 
                        name={this.props.name} 
                        attributes={this.props.shape.attributes}/>

            case 'line': 
            return <Line removeDrawing={this.props.removeDrawing} 
                        drawingId={this.props.drawingId} 
                        showOverlay={this.props.showOverlay} 
                        showToolTip={this.props.showToolTip} 
                        name={this.props.name} 
                        attributes={this.props.shape.attributes}/>

            case 'pen':
            case 'pencil':
            case 'eraser':
            return <Path removeDrawing={this.props.removeDrawing} 
                        drawingId={this.props.drawingId} 
                        showOverlay={this.props.showOverlay} 
                        showToolTip={this.props.showToolTip} 
                        name={this.props.name} 
                        attributes={this.props.shape.attributes}/>

            default:
                return null;           
        }
    }

    render(){
        return this.renderShape();
    }
} 