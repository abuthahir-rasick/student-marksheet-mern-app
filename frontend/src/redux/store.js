import authReducer from "./authSlice";
import markReducer from "./markSlice";
import { configureStore } from '@reduxjs/toolkit';


export const store=configureStore({
    reducer:{
        auth:authReducer,
        marks:markReducer
    }
})