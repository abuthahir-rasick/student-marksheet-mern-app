import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";

export const getAnalytics=createAsyncThunk(
    'analytics/all',
    async (examType,thunkApi)=>{
        try {
            const res=await API.get(`/analytics/class?examType=${examType}`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)
const analyticsSlice=createSlice({
    name:'analytics',
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    extraReducers:builder=>{
        builder
        .addCase(getAnalytics.pending,(state)=>{
                    state.loading=true
        })
        .addCase(getAnalytics.fulfilled,(state,action)=>{
                    state.loading=false
                    state.data=action.payload.analytics;
         })
         .addCase(getAnalytics.rejected,(state,action)=>{
                 state.loading=false
                 state.error=action.payload
         })
        
    }
})

export default analyticsSlice.reducer;