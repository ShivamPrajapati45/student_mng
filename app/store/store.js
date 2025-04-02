import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from './userSlice.js'


const reducer = combineReducers({
    user: userReducer
});

const store = configureStore({
    reducer:reducer
});

export default store;

