import React from 'react'
import { useState } from 'react'

const UpdateStudentModal = ({student,onClose,onSave,loading}) => {
    const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
};
    const [formData,setFormData]=useState({
        name:student.name,
        rollNo:student.rollNo,
        dob:formatDate(student.dob)
    })
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSave=(e)=>{
        e.preventDefault();
        onSave(formData);
    }
  return (
    <div style={overlayStyle}>
        <div style={modalStyle}>
            <h3>Update Student</h3>
            <form onSubmit={handleSave}>
                <input name="name" value={formData.name} placeholder='Name' onChange={handleChange} required/>
                <input name="rollNo" value={formData.rollNo} placeholder='Roll No' onChange={handleChange} required/>
                <input name="dob"  value={formData.dob} type="date" placeholder='Date of Birth' onChange={handleChange} required/>
                <div style={{marginTop:'10px'}}>
                    <button type="submit" disabled={loading}>{loading?'Updating...':'Update'}</button>
                    <button type="button" onClick={onClose} style={{marginLeft:'10px'}}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateStudentModal
const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const modalStyle = {
    background: "#fff",
    padding: "20px",
    width: "400px",
    borderRadius: "8px",
};