const actionTypes = {
    ROOMID_ENTERED:"ROOMID_ENTERED",
    NAME_ENTERED:"NAME_ENTERED",
    TOOL_CHANGED:"TOOL_CHANGED",
    CLEAR_ALL:"CLEAR_ALL"    
}

export const roomIdEntered = (roomId)=>{
    return {
        type:actionTypes.ROOMID_ENTERED,
        payload:roomId
    }
}

export const nameEntered = (name)=>{
    return {
        type:actionTypes.NAME_ENTERED,
        payload:name
    }
}

export const toolChanged = (selectedTool)=>{
    return {
        type:actionTypes.TOOL_CHANGED,
        payload:selectedTool
    }
}

export const clearAll = ()=>{
    return {
        type:actionTypes.CLEAR_ALL
    }
}

export default actionTypes;