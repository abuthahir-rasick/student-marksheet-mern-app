import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudent, getClassStudents, updateStudent } from '../redux/TeacherSlice';
import UpdateStudentModal from './UpdateStudentModal';

const ClassStudentsList = () => {
    const {list,loading,error}=useSelector((state)=>state.teacherSlice)
    const [selectedStudent,setSelectedStudent]=useState(null);
     const dispatch=useDispatch();
     const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0].split('-').reverse().join('-');
};
 
    const handleUpdate=(student)=>{
        setSelectedStudent(student)
    }
    const handleDelete=(id)=>{
        if(window.confirm("Are you want to delete this student?")){
            dispatch(deleteStudent(id))
        }
    }
    const handleSave=async(data)=>{
       await dispatch(updateStudent({
            id:selectedStudent._id,
            data
        })).then(()=>{
            setSelectedStudent(null);
            dispatch(getClassStudents());
        })
    }
    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>
  return (
    <div>
        <h3>Class Students</h3>
        {list.length===0?(<p>No Students found</p>):(
            <table border="1">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Roll No</td>
                        <td>Date of Birth</td>
                        <td>Class</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(student=>(
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.rollNo}</td>
                            <td>{formatDate(student.dob)}</td>
                            <td>{student.className}</td>
                            <td><button onClick={()=>handleUpdate(student)}>Update</button></td>
                            <td><button onClick={()=>handleDelete(student._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
         {selectedStudent &&(
                <UpdateStudentModal
                student={selectedStudent}
                onClose={()=>setSelectedStudent(null)}
                onSave={handleSave}
                loading={loading}
                />
            )}
    </div>
  )
}

export default ClassStudentsList