import authReducer from "./authSlice";
import markReducer from "./markSlice";
import { configureStore } from '@reduxjs/toolkit';
import studentMarksReducer from "./studentSlice";
import teacherReducer from "./TeacherSlice";
import analyticsReducer from "./analyticsSlice";


export const store=configureStore({
    reducer:{
        auth:authReducer,
        marks:markReducer,
        studentMarks:studentMarksReducer,
        teacherSlice:teacherReducer,
        analyticsSlice:analyticsReducer
    }
})