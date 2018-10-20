import actionTypes from './actions'

const initialState = {
    name:"anonymous",
    roomId:-1
}

export default function (state=initialState, action) {

    switch(action.type){
        case actionTypes.ROOMID_ENTERED:
            return {...state, roomId: action.payload};
        case actionTypes.NAME_ENTERED:
            return {...state, name: action.payload};
        default :
            return state;
    }
}