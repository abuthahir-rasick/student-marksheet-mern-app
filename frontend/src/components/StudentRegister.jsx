import React from 'react'

const StudentRegister = ({handleRegisterChange,handleRegisterSubmit,registerForm,loading}) => {
  return (
    <>
    <h2>Student Register</h2>
        <form onSubmit={handleRegisterSubmit}>
           
                <input name='name' value={registerForm.name} placeholder='Name' onChange={handleRegisterChange} required/>
            
                
            
                <input name='rollNo' value={registerForm.rollNo} placeholder='Roll No' onChange={handleRegisterChange} required/>

                <input name='className' value={registerForm.className} placeholder='Class Name' onChange={handleRegisterChange} required/>
            
                <input name='dob' type='date' value={registerForm.dob} placeholder='Date of Birth' onChange={handleRegisterChange} required />

            <button type='submit' disabled={loading}>Register</button>
        </form>
    </>
  )
}

export default StudentRegister