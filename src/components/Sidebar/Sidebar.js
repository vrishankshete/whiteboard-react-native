import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './actions';
import { View, TouchableOpacity, Text} from 'react-native';
import { sidebarStyles } from '../../styles/styles'

class Sidebar extends React.Component{
    changeTool(e){
        if(e==='clearAll'){
            this.props.socket.emit("clearAll");
        }
        else{
            this.props.toolChanged(e);
        }
    }
    render(){
        return (
            <View style={{flex:1}}>
                {[{key:'pen',display:'Pen'},{key:'pencil',display:'Dotted Pen'},
                {key:'line',display:'Line'},{key:'rectangle',display:'Rectangle'},
                {key:'ellipse',display:'Ellipse'},{key:'removeDrawing',display:'Remove'},
                {key:'clearAll',display:'Clear All'}].map((element,index)=>{
                    return(<View key={index} style={{flex:1}}>
                        <TouchableOpacity style={[sidebarStyles.shapeButton, {backgroundColor:this.props.selectedTool==element.key?'green':'yellow'}]}
                            onPress={()=>{this.changeTool(element.key)}}>
                            <Text>{element.display}</Text>
                        </TouchableOpacity>
                    </View>);
                })}
            </View>
        );
    }
}

const mapStateToProos = (rootState) => {
    return {
        selectedTool: rootState.sidebar.selectedTool
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toolChanged:(selectedTool)=>dispatch(actionCreator.toolChanged(selectedTool))
    }
}
export default connect(mapStateToProos, mapDispatchToProps)(Sidebar);