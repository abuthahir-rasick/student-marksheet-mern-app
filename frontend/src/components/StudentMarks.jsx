import React from 'react'

const StudentMarks = ({handleSubmit,form,handleChange,editId}) => {
  return (
    <>
      <h2>Add Student Marks</h2>
        <form onSubmit={handleSubmit}>
            <input name='rollNo' value={form.rollNo} placeholder='Roll No' onChange={handleChange}/>
            <select name='examType' value={form.examType} onChange={handleChange}>
                <option value='Quarterly'>Quarterly</option>
                <option value='Halfyearly'>Half-Yearly</option>
                <option value='Annual'>Annual</option>
            </select>
            <input name='tamil' value={form.tamil} placeholder='Tamil' onChange={handleChange}/>/100
            <input name='english' value={form.english} placeholder='English' onChange={handleChange}/>/100
            <input name='maths' value={form.maths} placeholder='Maths' onChange={handleChange}/>/100
            <input name='science' value={form.science} placeholder='Science' onChange={handleChange}/>/100
            <input name='social' value={form.social} placeholder='Social' onChange={handleChange}/>/100
            <button type='submit'>{editId?'Update marks':'Add marks'}</button>
            
        </form>
    </>
  )
}

export default StudentMarks
