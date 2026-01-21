import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMarks, deleteMarks, getClassMarks, updateMarks } from '../redux/markSlice';
import { studentRegister } from '../redux/authSlice';
import ClassStudentsList from './ClassStudentsList';
import { getClassStudents } from '../redux/TeacherSlice';

const TeacherDashboard = () => {
    const dispatch=useDispatch();
    const {list}=useSelector(state=>state.marks);
    const {loading,value}=useSelector((state)=>state.auth);
    const [editId,setEditId]=useState(null);
    
    const initialFormMarksState={
        rollNo:'',
        examType:'Quarterly',
        tamil:'',
        english:'',
        maths:'',
        science:'',
        social:''
    }
    const initialRegisterFormState={
        name:'',
        rollNo:'',
        email:'',
        password:'',
        className:value?value.className:''
    }
    const [form,setForm]=useState(initialFormMarksState);
    const [registerForm,setRegisterForm]=useState(initialRegisterFormState);

    useEffect(()=>{
        dispatch(getClassMarks());
        dispatch(getClassStudents());
    },[dispatch])
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleRegisterChange=(e)=>{
        setRegisterForm({...registerForm,[e.target.name]:e.target.value})
    }
    const handleRegisterSubmit=async(e)=>{
            e.preventDefault();
            try {
            await dispatch(studentRegister(
                {name:registerForm.name,rollNo:registerForm.rollNo,email:registerForm.email,
                    password:registerForm.password,className:registerForm.className})
            ).unwrap()
            dispatch(getClassStudents());
            setRegisterForm(initialRegisterFormState);
            } catch (error) {
                //
            }
            
        }

    const handleEdit=(mark)=>{
        setEditId(mark._id);
        setForm({
            rollNo:mark.studentId.rollNo,
            examType:mark.examType,
            tamil:mark.subjects.tamil,
            english:mark.subjects.english,
            maths:mark.subjects.maths,
            science:mark.subjects.science,
            social:mark.subjects.social,

        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const payload={
            rollNo:form.rollNo,
            examType:form.examType,
            subjects:{
                tamil:Number(form.tamil),
                english:Number(form.english),
                maths:Number(form.maths),
                science:Number(form.science),
                social:Number(form.social)
            }
        }
        if(editId){
            await dispatch(updateMarks({id:editId,data:payload})).unwrap();
            setEditId(null);
        }
        else{
          await dispatch(addMarks(payload)).unwrap() 
        }
        dispatch(getClassMarks());
        setForm(initialFormMarksState);
        } catch (error) {
            
        }
        
    }
  return (
    <div>
        <h2>Teacher Dashboard</h2>
        <h2>Student Register</h2>
        <form onSubmit={handleRegisterSubmit}>
           
                <input name='name' value={registerForm.name} placeholder='Name' onChange={handleRegisterChange} required/>
            
                <input type='email' value={registerForm.email} placeholder='Email' name='email' onChange={handleRegisterChange} required/>
            
                <input name='rollNo' value={registerForm.rollNo} placeholder='Roll No' onChange={handleRegisterChange} required/>

                <input name='className' value={registerForm.className} placeholder='Class Name' onChange={handleRegisterChange} required/>
            
            
            <input type='password' value={registerForm.password} placeholder='Password'name='password' onChange={handleRegisterChange} required/>
            <button type='submit' disabled={loading}>Register</button>
        </form>
        <ClassStudentsList/>
        <h2>Class Marks</h2>
        <form onSubmit={handleSubmit}>
            <input name='rollNo' value={form.rollNo} placeholder='Roll No' onChange={handleChange}/>
            <select name='examType' value={form.examType} onChange={handleChange}>
                <option value='Quarterly'>Quarterly</option>
                <option value='Halfyearly'>Half-Yearly</option>
                <option value='Annual'>Annual</option>
            </select>
            <input name='tamil' value={form.tamil} placeholder='Tamil' onChange={handleChange}/>
            <input name='english' value={form.english} placeholder='English' onChange={handleChange}/>
            <input name='maths' value={form.maths} placeholder='Maths' onChange={handleChange}/>
            <input name='science' value={form.science} placeholder='Science' onChange={handleChange}/>
            <input name='social' value={form.social} placeholder='Social' onChange={handleChange}/>
            <button type='submit'>{editId?'Update marks':'Add marks'}</button>
            
        </form>
        {list.length>0 && (
                <div>
                <h3>Class Marks</h3>
                {list.map((m)=>(
                    <div key={m._id}>
                        <b>{m.studentId?.name}</b> {m.examType} == Total - {m.total}
                        <button onClick={()=>handleEdit(m)}>Update</button>
                        <button onClick={()=>dispatch(deleteMarks(m._id))}>Delete</button>
                    </div>
                ))}
           </div> )}
    </div>
  )
}

export default TeacherDashboard