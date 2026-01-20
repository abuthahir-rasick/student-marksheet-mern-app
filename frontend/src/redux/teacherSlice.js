import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";


export const getClassStudents=createAsyncThunk(
    'class/students',
    async(_,thunkApi)=>{
        try {
            const res=await API.get('/auth/getClassStudents');
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)
export const updateStudent = createAsyncThunk(
    'student/update',
    async ({id,data},thunkApi)=>{
        try {
            const res=await API.put(`/auth/student/${id}`,data);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)
export const deleteStudent=createAsyncThunk(
    'student/delete',
    async (id,thunkApi)=>{
        try {
            await API.delete(`/auth/student/${id}`);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)

const teacherSlice=createSlice({
    name:'students',
    initialState:{
        list:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
            builder
            .addCase(getClassStudents.pending,(state)=>{
                        state.loading=true
            })
            .addCase(getClassStudents.fulfilled,(state,action)=>{
                        state.loading=false
                        state.list=action.payload.students
            })
           
             .addCase(updateStudent.pending,(state)=>{
                                state.loading=true
            })
            .addCase(updateStudent.fulfilled,(state,action)=>{
                                state.loading=false
                                const index=state.list.findIndex((s)=>s._id===action.payload._id);
                                state.list[index]=action.payload.student
            })
             .addCase(deleteStudent.pending,(state)=>{
                                state.loading=true
            })
          .addCase(deleteStudent.fulfilled,(state,action)=>{
                                state.loading=false
                                state.list=state.list.filter((s)=>s._id!==action.payload)
         })
                    
            .addMatcher((action)=>action.type.endsWith('rejected'),
                (state,action)=>{
                    state.loading=false
                    state.error=action.payload
                }
                )
        }
})

export default teacherSlice.reducer;