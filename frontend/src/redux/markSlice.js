import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../api/api";




export const addMarks=createAsyncThunk(
    'marks/add',
    async (data,thunkApi)=>{
        try {
            const res=await API.post('/marksheet',data);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)
export const getClassMarks=createAsyncThunk(
    'marks/all',
    async (_,thunkApi)=>{
        try {
            const res=await API.get('/marksheet/all');
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)
export const updateMarks=createAsyncThunk(
    'marks/update',
    async ({id,data},thunkApi)=>{
        try {
            const res=await API.put(`/marksheet/${id}`,data);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)
export const deleteMarks=createAsyncThunk(
    'marks/delete',
    async (id,thunkApi)=>{
        try {
            await API.delete(`/marksheet/${id}`);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)

const markslice=createSlice({
    name:'mark',
    initialState:{
        list:[],
        loading:false,
        error:false
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getClassMarks.pending,(state)=>{
                    state.loading=true
        })
        .addCase(getClassMarks.fulfilled,(state,action)=>{
                    state.loading=false
                    state.list=action.payload.marks
         })
        
        .addCase(addMarks.pending,(state)=>{
                    state.loading=true
                })
        .addCase(addMarks.fulfilled,(state,action)=>{
                    state.loading=false
                    state.list.push(action.payload.marksheet)
        })
        
        .addCase(deleteMarks.pending,(state)=>{
                    state.loading=true
                })
        .addCase(deleteMarks.fulfilled,(state,action)=>{
                    state.loading=false
                    state.list=state.list.filter((m)=>m._id!==action.payload)
        })
        
        .addCase(updateMarks.pending,(state)=>{
                    state.loading=true
                })
        .addCase(updateMarks.fulfilled,(state,action)=>{
                    state.loading=false
                    const index=state.list.findIndex((m)=>m._id===action.payload._id);
                    state.list[index]=action.payload
        })
        
        .addMatcher((action)=>action.type.endsWith('rejected'),
    (state,action)=>{
        state.loading=false
        state.error=action.payload
    }
    )
        
    }
})

export default markslice.reducer;