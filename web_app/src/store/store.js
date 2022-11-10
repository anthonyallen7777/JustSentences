import {configureStore, combineReducers} from '@reduxjs/toolkit';

//import reducers
import authReducer from '../store/reducers/auth';


// combine all reducers
const rootReducer = combineReducers({
    authenticate: authReducer
})

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;