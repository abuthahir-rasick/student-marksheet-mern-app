import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const API=axios.create({baseURL:'http://localhost:5000/api'});

const token=localStorage.getItem('token');

export const studentLogin=createAsyncThunk(
    '/student/login',
    async({rollNo,password},thunkApi)=>{
        try {
            const res=await API.post('/student-auth/login',{rollNo,password});
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

export const teacherLogin =createAsyncThunk(
    '/teacher/login',
    async({email,password},thunkApi)=>{
        try {
            const res=await API.post('/auth/login-teacher',{email,password});
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:token || null,
        role:null,
        loading:false,
        error:null
    },
    reducers:{
        logout:(state)=>{
            state.token=null
            state.role=null
            localStorage.removeItem('token')
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(studentLogin.pending,(state)=>{
            state.loading=true
        })
        .addCase(studentLogin.fulfilled,(state,action)=>{
            state.loading=false
            state.token=action.payload.token
            state.role='student'
            localStorage.addItem('token',action.payload.token)
        })
        .addCase(studentLogin.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(teacherLogin.pending,(state)=>{
            state.loading=true
        })
        .addCase(teacherLogin.fulfilled,(state,action)=>{
            state.loading=false
            state.token=action.payload.token
            state.role='teacher'
            localStorage.addItem('token',action.payload.token)
        })
        .addCase(teacherLogin.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export const {logout}=authSlice.actions;
export default authSlice.reducer;