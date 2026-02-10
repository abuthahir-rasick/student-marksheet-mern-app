import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMarks, deleteMarks, getClassMarks, updateMarks } from '../redux/markSlice';
import { studentRegister } from '../redux/authSlice';
import ClassStudentsList from '../components/ClassStudentsList';
import { getClassStudents } from '../redux/TeacherSlice';
import Tabs from '../components/Tabs';
import StudentRegister from '../components/StudentRegister';
import StudentMarks from '../components/StudentMarks';
import ClassMarks from '../components/ClassMarks';
import TeacherAnalytics from '../components/TeacherAnalytics';

const TeacherDashboard = () => {
    const dispatch=useDispatch();
    const {list}=useSelector(state=>state.marks);
    const {loading,value}=useSelector((state)=>state.auth);
    const [editId,setEditId]=useState(null);
    const tabs=['Student Register','Students List','Add Marks','Mark List','Class Analytics']
    const [activeTab,setActiveTab]=useState('Student Register')
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
        dob:'',
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
                {name:registerForm.name,rollNo:registerForm.rollNo,dob:registerForm.dob,className:registerForm.className})
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
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab==='Student Register' &&  (
            <StudentRegister handleRegisterChange={handleRegisterChange} handleRegisterSubmit={handleRegisterSubmit} registerForm={registerForm} loading={loading} />
        )}
        {activeTab==='Students List' && (
             <ClassStudentsList/>
        )}
       {activeTab==='Add Marks' && (
        <StudentMarks handleSubmit={handleSubmit} handleChange={handleChange} form={form} editId={editId}/>
       )}
        {activeTab==='Mark List'&&(
            <ClassMarks list={list} handleEdit={handleEdit} dispatch={dispatch} deleteMarks={deleteMarks} />
        )}
        {activeTab==='Class Analytics'&&(
            <TeacherAnalytics />
        )}
    </div>
  )
}

export default TeacherDashboard