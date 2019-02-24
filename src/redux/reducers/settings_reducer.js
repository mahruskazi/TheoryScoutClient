
const initialState = {
    orientation: 1,
    error: null,
}

export default function (state=initialState, action) {
    switch(action.type){
        case 'SET_ORIENTATION': {
            console.log("Setting orientation")
            orientation = action.payload ? 1 : -1;
            return {...state, orientation}
        }
    }
    
    return state
}