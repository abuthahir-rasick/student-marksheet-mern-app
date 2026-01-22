import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCaptcha, studentLogin, studentRegister, teacherLogin, teacherRegister } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [mode,setMode]=useState('student');
    const initialFormState={
        name:'',
        rollNo:'',
        email:'',
        password:'',
        dob:'',
        captcha:'',
        className:''
    }
    const [form,setForm]=useState(initialFormState);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {error,loading,token,role,captcha}=useSelector((state)=>state.auth);

    useEffect(()=>{
        if(mode==='student'){
        dispatch(getCaptcha());
        }
    },[mode,dispatch])

    useEffect(()=>{
        if(token && role ==='teacher'){
            navigate('/teacher')
        }
        if(token && role==='student'){
            navigate('/student')
        }
    })

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
            dispatch(studentLogin({rollNo:form.rollNo,dob:form.dob,captcha:form.captcha})).unwrap()
        }
        if(mode==='registerTeacher'){
            dispatch(teacherRegister({name:form.name,email:form.email,password:form.password,className:form.className})).unwrap()
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
            {mode==='registerTeacher' && 'Teacher Register'}
        </h2>
        <div>
            <button onClick={()=>setMode('student')} >Student Login</button>
        <button onClick={()=>setMode('teacher')}>Teacher Login</button>
        <button onClick={()=>setMode('registerTeacher')}>Teacher Register</button>
        </div>
        
        <form onSubmit={handleSubmit}>
            {(mode.includes('register'))&&(
                <input name='name' value={form.name} placeholder='Name' onChange={handleChange} required/>
            )}
            {(mode==='teacher' || mode==='registerTeacher')&&(
                <input type='email' value={form.email} placeholder='Email' name='email' onChange={handleChange} required/>
            )}
            {(mode==='student')&&(<>
                <input name='rollNo' value={form.rollNo} placeholder='Roll No' onChange={handleChange} required/>
                <input name='dob' type='date' value={form.dob} placeholder='Date of Birth' onChange={handleChange} required />
                <div style={{margin:'8px 0'}}>
                    <b>{captcha}</b>
                    <button type='button' onClick={()=>dispatch(getCaptcha())} style={{marginLeft:'10px'}}>↻</button>
                </div>
                <input name='captcha' value={form.captcha} placeholder='Captcha' onChange={handleChange} required/>
                </>
            )}

            {(mode.includes('register'))&&(
                <input name='className' value={form.className} placeholder='Class Name' onChange={handleChange} required/>
            )}
             {(mode==='teacher' || mode==='registerTeacher')&&(
            <input type='password' value={form.password} placeholder='Password'name='password' onChange={handleChange} required/>
            )}

            <button type='submit' disabled={loading}>{mode.includes('register')?'Register':'Login'}</button>
        </form>
        {error && <p>{error}</p>}
    </div>
  )
}

export default Login