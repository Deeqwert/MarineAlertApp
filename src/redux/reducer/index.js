import { combineReducers } from 'redux';
import AuthenticationReducer from './AuthenticationReducer';
import ApplicationReducer from './ApplicationReducer';

const rootReducer = combineReducers({
    AuthenticationReducer: AuthenticationReducer,
    ApplicationReducer: ApplicationReducer,
})

const appReducer = (state, action) => {
    return rootReducer(state, action)
}

export default appReducer; 