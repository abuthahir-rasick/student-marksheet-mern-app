import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/api';

const teacherFromStorage=localStorage.getItem('teacher')?JSON.parse(localStorage.getItem('teacher')):null;

export const studentRegister=createAsyncThunk(
    '/student/register',
    async(data,thunkApi)=>{
        try {
            const res=await API.post('/auth/register-student',data);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)
export const teacherRegister=createAsyncThunk(
    '/teacher/register',
    async(data,thunkApi)=>{
        try {
            const res=await API.post('/auth/register-teacher',data);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)

export const getCaptcha=createAsyncThunk(
    '/captcha',
    async(_,thunkApi)=>{
        try {
            const res=await API.get('/captcha');
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)


export const studentLogin=createAsyncThunk(
    '/student/login',
    async({rollNo,dob,captcha},thunkApi)=>{
        try {
            const res=await API.post('/student-auth/login',{rollNo,dob,captcha});
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
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
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)

export const teacherForgotPassword =createAsyncThunk(
    '/teacher/forgotPassword',
    async({email},thunkApi)=>{
        try {
            const res=await API.post('/auth/forgot-password-teacher',{email});
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)

export const verifyOtp =createAsyncThunk(
    '/teacher/verifyOtp',
    async({email,otp},thunkApi)=>{
        try {
            const res=await API.post('/auth/verify-otp',{email,otp});
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)

export const resetTeacherPassword =createAsyncThunk(
    '/teacher/reset-password-teacher',
    async({email,newPassword},thunkApi)=>{
        try {
            const res=await API.post('/auth/reset-password-teacher',{email,newPassword});
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)


const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:localStorage.getItem('token') || null,
        role:null,
        loading:false,
        error:null,
        success:false,
        value:teacherFromStorage,
        captcha:'',
        otpVerified:false
    },
    reducers:{
        logout:(state)=>{
            state.token=null
            state.role=null
            localStorage.removeItem('token')
        },
        resetRegisterState:(state)=>{
            state.success=false
            state.loading=false
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(studentRegister.pending,(state)=>{
            state.loading=true
        })
        .addCase(studentRegister.fulfilled,(state)=>{
            state.loading=false
            state.success=true
        })
        .addCase(studentRegister.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(getCaptcha.pending,(state)=>{
            state.loading=true
        })
        .addCase(getCaptcha.fulfilled,(state,action)=>{
            state.loading=false
            state.captcha=action.payload.captcha
        })
        .addCase(getCaptcha.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(studentLogin.pending,(state)=>{
            state.loading=true
        })
        .addCase(studentLogin.fulfilled,(state,action)=>{
            state.loading=false
            state.token=action.payload.token
            state.role='student'
            localStorage.setItem('token',action.payload.token)
        })
        .addCase(studentLogin.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(teacherRegister.pending,(state)=>{
            state.loading=true
        })
        .addCase(teacherRegister.fulfilled,(state)=>{
            state.loading=false
            state.success=true
        })
        .addCase(teacherRegister.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(teacherLogin.pending,(state)=>{
            state.loading=true
        })
        .addCase(teacherLogin.fulfilled,(state,action)=>{
            state.loading=false
            state.token=action.payload.token
            state.value=action.payload
            state.role='teacher'
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('teacher',JSON.stringify(action.payload));
        })
        .addCase(teacherLogin.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(teacherForgotPassword.pending,(state)=>{
            state.loading=true
        })
        .addCase(teacherForgotPassword.fulfilled,(state,action)=>{
            state.loading=false
        })
        .addCase(teacherForgotPassword.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(verifyOtp.pending,(state)=>{
            state.loading=true
        })
        .addCase(verifyOtp.fulfilled,(state,action)=>{
            state.loading=false
            state.otpVerified=true
        })
        .addCase(verifyOtp.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(resetTeacherPassword.pending,(state)=>{
            state.loading=true
        })
        .addCase(resetTeacherPassword.fulfilled,(state,action)=>{
            state.loading=false
            state.otpVerified=false
        })
        .addCase(resetTeacherPassword.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export const {logout,resetRegisterState}=authSlice.actions;
export default authSlice.reducer;