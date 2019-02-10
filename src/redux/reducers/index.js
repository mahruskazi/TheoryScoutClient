import { combineReducers  } from 'redux'
import MatchReducer from './match_reducer'

const reducers = combineReducers(
    {
        matches: MatchReducer
    }
);

export default reducers;