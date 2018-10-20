import actionTypes from './actions'

const initialState = {
    selectedTool:'pen'
}

export default function (state=initialState, action) {
    switch(action.type){
        case actionTypes.TOOL_CHANGED:
            return {...state, selectedTool: action.payload};   
        default :
            return state;
    }
}