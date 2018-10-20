import { StyleSheet} from 'react-native';

export const homeStyles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: 'black',
        padding:'10%',
        width:'100%'
    },
    inputContainer: {
        flex:0.4,
        width:'80%',
        height:'100%',
        alignItems:'center'
    },
    messageContainer:{
        flex:0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBig:{
        textAlign:'center', 
        padding:'5%', 
        fontWeight:'bold', 
        fontSize:26, 
        color:'white'
    },
    textMedium:{
        textAlign:'center',
        fontWeight:'bold', 
        fontSize:16, 
        color:'white'
    },
    input: {
        width:'80%',
        height:'30%',
        textAlign: 'center',
        color:'white',
        borderBottomColor:'white',
        borderBottomWidth:2
    },
    joinButton: {
        width:'80%',
        height:'60%',
        justifyContent:'center',
        backgroundColor:'#841584',
        borderRadius: 10
    }
});

export const sidebarStyles = StyleSheet.create({
    shapeButton: {
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1
    }
});

export const stageStyles = StyleSheet.create({
    container:{
        paddingTop:'10%',
        flex:1,
        backgroundColor: 'black'
    },
    drawerContainer:{
        flex: 1,
        paddingTop:'40%',
        backgroundColor:'gray'
    },
    hideOptionsButton:{
        borderRadius: 30,
        borderColor:'white',
        height:'10%',
        backgroundColor: 'red',
        justifyContent:'center',
        borderRadius: 10
    },
    optionsButton:{
        width: '12%',
        height: '5%',
        borderRadius: 30,
        position:'absolute',
        bottom:'10%',
        backgroundColor: 'gray',
        opacity:0.5,
        justifyContent:'center',
        borderRadius: 10
    },
    hideOptionsText:{
        textAlign:'center',
        fontWeight:'bold', 
        fontSize:14, 
        color:'white'
    },
    optionsText:{
        padding:'10%',
        textAlign:'center',
        fontWeight:'bold', 
        fontSize:10, 
        color:'white'
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:'5%',
        paddingRight:'5%'
    }
});

export const canvasStyles = StyleSheet.create({
    container:{
        flex:1,
        borderColor:'white',
        borderWidth:1
    }
});