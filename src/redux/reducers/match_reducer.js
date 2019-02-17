
const initialState = {
    matches: [],
    error: null,
}

export default function (state=initialState, action) {
    switch(action.type){
        case 'DELETE_ALL_MATCHES': {
            return {...state, matches: []}
        }
        case 'ADD_MATCH': {
            state.matches.push(action.payload)
            console.log("MATCH ADDED - Now at: " + state.matches.length)
            return {...state}
        }
        case 'DELETE_MATCH': {
            //TODO: Add option to delete match
            return {...state, fetching: false, error: action.payload}
        }
        case 'UPDATE_MATCH': {
            //TODO: Add option to update match
            return {...state}
        }
    }
    
    return state
}