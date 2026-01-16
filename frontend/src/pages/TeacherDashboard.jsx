import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMarks, deleteMarks, getClassMarks } from '../redux/markSlice';

const TeacherDashboard = () => {
    const dispatch=useDispatch();
    const {list}=useSelector(state=>state.marks);
    
    const initialFormState={
        rollNo:'',
        examType:'Quarterly',
        tamil:'',
        english:'',
        maths:'',
        science:'',
        social:''
    }
    const [form,setForm]=useState(initialFormState);

    useEffect(()=>{
        dispatch(getClassMarks());
    },[dispatch])
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
          await dispatch(addMarks({
            rollNo:form.rollNo,
            examType:form.examType,
            subjects:{
                tamil:Number(form.tamil),
                english:Number(form.english),
                maths:Number(form.maths),
                science:Number(form.science),
                social:Number(form.social)
            }
        })).unwrap() 
        dispatch(getClassMarks());
        setForm(initialFormState);
        } catch (error) {
            
        }
        
    }
  return (
    <div>
        <h2>Teacher Dashboard</h2>
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
            <button type='submit'>Add Marks</button>
            
        </form>
        {list.length>0 && (
                <div>
                <h3>Class Marks</h3>
                {list.map((m)=>(
                    <div key={m._id}>
                        <b>{m.studentId?.name}</b> {m.examType} == Total - {m.total}
                        <button onClick={()=>dispatch(deleteMarks(m._id))}>Delete</button>
                    </div>
                ))}
           </div> )}
    </div>
  )
}

export default TeacherDashboard