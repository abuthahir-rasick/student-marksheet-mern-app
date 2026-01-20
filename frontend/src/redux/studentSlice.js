import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";


export const getMyMarks=createAsyncThunk(
    'marksheet/my',
    async(_,thunkApi)=>{
        try {
            const res=await API.get('/marksheet/my');
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)

const studentSlice=createSlice({
    name:'Student Marksheet',
    initialState:{
        list:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getMyMarks.pending,(state)=>{
                    state.loading=true
        })
        .addCase(getMyMarks.fulfilled,(state,action)=>{
                    state.loading=false
                    state.list=action.payload.marks
        })
        .addCase(getMyMarks.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
    }
})

export default studentSlice.reducer;