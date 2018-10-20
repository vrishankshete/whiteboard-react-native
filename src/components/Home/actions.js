const actionTypes = {
    ROOMID_ENTERED:"ROOMID_ENTERED",
    NAME_ENTERED:"NAME_ENTERED"   
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

export default actionTypes;