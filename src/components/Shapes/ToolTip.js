import React from 'react';
//import {Text} from 'react-native-svg';
import { Svg } from 'expo';
const { Text } = Svg;

export default class ToolTip extends React.Component{
    render(){
        let {x, y, name} = this.props;
        return (
            <Text stroke='red' x={x} y={y}>{name}</Text>
        );
    }
} 