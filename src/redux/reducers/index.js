import { combineReducers  } from 'redux'
import MatchReducer from './match_reducer'
import EventReducer from './event_reducer'
import SettingsReducer from './settings_reducer'

const reducers = combineReducers(
    {
        matches: MatchReducer,
        events: EventReducer,
        settings: SettingsReducer
    }
);

export default reducers;