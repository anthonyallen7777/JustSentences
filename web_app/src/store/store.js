import {configureStore, combineReducers} from '@reduxjs/toolkit';

//import reducers
import authReducer from '../store/reducers/auth';
import practiceReducer from '../store/reducers/practice';
import userReducer from '../store/reducers/user';


// combine all reducers
const rootReducer = combineReducers({
    authenticate: authReducer,
    practice: practiceReducer,
    user: userReducer
})

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;