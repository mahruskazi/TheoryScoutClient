import { combineReducers  } from 'redux'
import MatchReducer from './match_reducer'
import EventReducer from './event_reducer'

const reducers = combineReducers(
    {
        matches: MatchReducer,
        events: EventReducer
    }
);

export default reducers;