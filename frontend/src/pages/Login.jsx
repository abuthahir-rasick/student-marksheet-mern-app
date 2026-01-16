import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { studentLogin, studentRegister, teacherLogin, teacherRegister } from '../redux/authSlice';

const Login = () => {
    const [mode,setMode]=useState('student');
    const initialFormState={
        name:'',
        rollNo:'',
        email:'',
        password:'',
        className:''
    }
    const [form,setForm]=useState(initialFormState);
    const dispatch=useDispatch();
    const {error,loading}=useSelector((state)=>state.auth);

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        try {
            if(mode==='teacher'){
            dispatch(teacherLogin({email:form.email,password:form.password})).unwrap()
        }
        if(mode==='student'){
            dispatch(studentLogin({rollNo:form.rollNo,password:form.password})).unwrap()
        }
        if(mode==='registerTeacher'){
            dispatch(teacherRegister({name:form.name,email:form.email,password:form.password,className:form.className})).unwrap()
        }
        if(mode==='registerStudent'){
            dispatch(studentRegister({name:form.name,rollNo:form.rollNo,email:form.email,password:form.password,className:form.className})).unwrap()
        }
        setForm(initialFormState);
        } catch (error) {
            //
        }
        
    }
  return (
    <div>
        <h2>{mode==='student'&&'Student Login'}
            {mode==='teacher' && 'Teacher Login'}
            {mode==='registerStudent' && 'Student Register'}
            {mode==='registerTeacher' && 'Teacher Register'}
        </h2>
        <div>
            <button onClick={()=>setMode('student')} >Student Login</button>
        <button onClick={()=>setMode('teacher')}>Teacher Login</button>
        <button onClick={()=>setMode('registerStudent')}>Student Register</button>
        <button onClick={()=>setMode('registerTeacher')}>Teacher Register</button>
        </div>
        
        <form onSubmit={handleSubmit}>
            {(mode.includes('register'))&&(
                <input name='name' value={form.name} placeholder='Name' onChange={handleChange} required/>
            )}
            {(mode==='teacher' || mode==='registerTeacher' || mode==='registerStudent')&&(
                <input type='email' value={form.email} placeholder='Email' name='email' onChange={handleChange} required/>
            )}
            {(mode==='student'|| mode==='registerStudent')&&(
                <input name='rollNo' value={form.rollNo} placeholder='Roll No' onChange={handleChange} required/>
            )}
            {(mode.includes('register'))&&(
                <input name='className' value={form.className} placeholder='Class Name' onChange={handleChange} required/>
            )}
            
            <input type='password' value={form.password} placeholder='Password'name='password' onChange={handleChange} required/>
            <button type='submit' disabled={loading}>{mode.includes('register')?'Register':'Login'}</button>
        </form>
        {error && <p>{error}</p>}
    </div>
  )
}

export default Login