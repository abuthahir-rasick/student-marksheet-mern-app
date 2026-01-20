import React from 'react'
import { useState } from 'react'

const UpdateStudentModal = ({student,onClose,onSave,loading}) => {
    const [formData,setFormData]=useState({
        name:student.name,
        rollNo:student.rollNo,
        email:student.email,
        className:student.className
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
                <input name="email" value={formData.email} type="email" placeholder='email' onChange={handleChange} required/>
                <input name="className" value={formData.className} placeholder='Class Name' onChange={handleChange} required/>
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