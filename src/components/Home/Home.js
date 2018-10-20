import React from 'react';
import {connect} from 'react-redux';
import { View, TextInput, ToastAndroid, TouchableOpacity, Text, BackHandler, Alert } from 'react-native';
import * as actionCreator from './actions';
import { homeStyles } from '../../styles/styles'

class Home extends React.Component{
    static navigationOptions = { header: null }
    constructor(props){
        super(props);
        this.name='';
        this.roomId='';
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
            Alert.alert(
                'Sure to exit?',
                'Are you sure to exit?',
                [
                    {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                    {text: 'OK', onPress: () => {
                            this.backHandler.remove();
                            BackHandler.exitApp();
                        }
                    },
                ]
            );
            return true;
        });
    }

    nameEntered(name){
        this.name=name;
    }
    roomIdEntered(roomId){
        this.roomId=roomId;  
    }
    enterRoom(){
        if(this.name === ''){
            ToastAndroid.show('Enter Name and 4 digit room id', ToastAndroid.LONG);
            return;
        }
        if(isNaN(Number(this.roomId)) || this.roomId.length !== 4){
            ToastAndroid.show('Enter 4 digit room id', ToastAndroid.LONG);
            return;
        }
        this.props.nameEntered(this.name);
        this.props.roomIdEntered(this.roomId);
        this.props.navigation.navigate('Stage');
    }
    
    render(){
        return (
            <View style={homeStyles.container}>
                <View style={homeStyles.messageContainer}><Text style={homeStyles.textBig}>{'Blackboard.io'}</Text></View>
                <View style={homeStyles.inputContainer}>
                    <Text style={homeStyles.textMedium}>{'*Name:'}</Text>
                    <TextInput placeholder='Touch here to enter name' underlineColorAndroid='transparent' style={homeStyles.input} onChangeText={(nameText)=>{this.nameEntered(nameText)}}/>
                </View>
                <View style={homeStyles.inputContainer}>
                    <Text style={homeStyles.textMedium}>{'*Room Id:'}</Text>
                    <TextInput placeholder='Touch here to enter room id' underlineColorAndroid='transparent' style={homeStyles.input} keyboardType='numeric' maxLength={4} onChangeText={(roomIdText)=>{this.roomIdEntered(roomIdText)}}/>
                </View>
                <View style={homeStyles.inputContainer}>
                    <TouchableOpacity style={homeStyles.joinButton} 
                        onPress={()=>{this.enterRoom()}}>
                        <Text style={homeStyles.textMedium}>{'Join Room'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={homeStyles.messageContainer}><Text style={homeStyles.textMedium}>A new room will be created if it does not exist</Text></View>
            </View>
        );
    }
}

const mapStateToProos = (rootState) => {
    return {
        roomId: rootState.home.roomId,
        name: rootState.home.name
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        roomIdEntered:(roomId)=>dispatch(actionCreator.roomIdEntered(roomId)),
        nameEntered:(name)=>dispatch(actionCreator.nameEntered(name))
    }
}
export default connect(mapStateToProos, mapDispatchToProps)(Home);