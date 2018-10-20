const actionTypes = {
    TOOL_CHANGED:"TOOL_CHANGED" 
}

export const toolChanged = (selectedTool)=>{
    return {
        type:actionTypes.TOOL_CHANGED,
        payload:selectedTool
    }
}

export default actionTypes;