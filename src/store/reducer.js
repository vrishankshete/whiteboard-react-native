import actionTypes from './actions'

const initialState = {
    name:"anonymous",
    roomId:-1,
    selectedTool:'pen',
    clearAll:false
}

const rootReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ROOMID_ENTERED:
            return {...state, roomId: action.payload};
        case actionTypes.NAME_ENTERED:
            return {...state, name: action.payload};
        case actionTypes.TOOL_CHANGED:
            return {...state, selectedTool: action.payload};
        case actionTypes.CLEAR_ALL:
            return {...state, clearAll: action.payload};    
        default :
            return state;
    }
}

export default rootReducer;