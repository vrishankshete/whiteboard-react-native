import React from 'react';
import { Text, View, DrawerLayoutAndroid, ToastAndroid, TouchableOpacity, Dimensions, Alert, BackHandler } from 'react-native';
import {connect} from 'react-redux';
import Sidebar from './Sidebar/Sidebar'
import Canvas from './Canvas';
import io from 'socket.io-client';
import { stageStyles } from '../styles/styles'
import { socketServerURL } from '../config/config'
const {width} = Dimensions.get('window');
let socket;
class Stage extends React.Component{
    static navigationOptions = { header: null }
    componentWillMount(){
        socket = io(socketServerURL);
        socket.on('connect', () => {
            ToastAndroid.show('Successful connection with server', ToastAndroid.SHORT);
        });
        socket.on('connect_error', error=>{
            this.props.navigation.navigate('Home');
            ToastAndroid.show('Please check your internet. Or server is down', ToastAndroid.LONG);
        });
        if(this.props.roomId === -1){
            ToastAndroid.show('Room id not correct.', ToastAndroid.LONG);
            this.props.navigation.navigate('Home');
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
            Alert.alert(
                'Sure to exit?',
                'Are you sure to exit? You will be disconnected from room.',
                [
                    {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                    {text: 'OK', onPress: () => {
                            this.props.navigation.navigate('Home');
                            this.backHandler.remove();
                        }
                    },
                ]
            );
            return true;
        });
    }

    componentWillUnmount(){
        socket.disconnect();
    }

    render(){
        var navigationView = (
            <View style={stageStyles.drawerContainer}> 
                <Sidebar socket={socket}/>
                <TouchableOpacity style={stageStyles.hideOptionsButton} 
                    onPress={()=>this.refs['shapDrawer'].closeDrawer()}>
                    <Text style={stageStyles.hideOptionsText}>{'Hide Options'}</Text>
                </TouchableOpacity>
            </View>
        );

        return (
            <DrawerLayoutAndroid
                ref={'shapDrawer'}
                drawerWidth={width/2}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <View style={stageStyles.container}> 
                    <View style={stageStyles.headerContainer}>
                        <Text selectable={true} style={{color:'white'}}>{`Room Id: ${this.props.roomId}`}</Text>
                        <Text selectable={true} style={{color:'white'}}>{`Name: ${this.props.name}`}</Text>
                    </View>
                    <Canvas socket={socket}/>
                    <TouchableOpacity style={stageStyles.optionsButton} 
                        onPress={()=>this.refs['shapDrawer'].openDrawer()}>
                        <Text style={stageStyles.optionsText}>{'Options'}</Text>
                    </TouchableOpacity>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

const mapStateToProps = (rootState) => {
    return{
        roomId: rootState.home.roomId,
        name: rootState.home.name,
        selectedTool: rootState.sidebar.selectedTool
    }
}

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Stage);