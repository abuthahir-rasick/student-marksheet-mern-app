import React from 'react'

const ClassMarks = ({list,handleEdit,dispatch,deleteMarks}) => {
  return (
    <>
      {list.length>0 && (
                <div>
                <h3>Class Marks</h3>
                <table border="1">
                    <thead>
                        <tr>
                            <td>Name</td> 
                            <td>Exam Type</td> 
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((m)=>(
                            <tr key={m._id}>
                                <td>{m.studentId?.name}</td>
                                <td>{m.examType}</td>
                                <td>{m.total}</td>
                                <td><button onClick={()=>handleEdit(m)}>Update</button></td>
                                <td><button onClick={()=>dispatch(deleteMarks(m._id))}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div> )}
    </>
  )
}

export default ClassMarks
