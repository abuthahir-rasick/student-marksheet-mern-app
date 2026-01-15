import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { studentLogin, teacherLogin } from '../redux/authSlice';

const Login = () => {
    const [role,setRole]=useState('');
    const [rollNo,setRollNo]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const dispatch=useDispatch();
    const {error,loading}=useSelector((state)=>state.auth);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(role==='teacher'){
            dispatch(teacherLogin({email,password}))
        }
        else{
            dispatch(studentLogin({rollNo,password}))
        }
    }
  return (
    <div>
        <h2>Login</h2>
        <button onClick={()=>setRole('student')} >Student</button>
        <button onClick={()=>setRole('teacher')}>Teacher</button>
        <form onSubmit={handleSubmit}>
            {role==='teacher'?(
                <input type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            ):(
                <input placeholder='Roll No' onChange={(e)=>setRollNo(e.target.value)} />
            )}
            <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
            <button type='submit' disabled={loading}>Login</button>
        </form>
        {error && <p>{error}</p>}
    </div>
  )
}

export default Login