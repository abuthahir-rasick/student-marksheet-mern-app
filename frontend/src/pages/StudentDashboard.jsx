import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyMarks } from '../redux/studentSlice';

const StudentDashboard = () => {
    const dispatch=useDispatch();
    const {list,loading,error}=useSelector((state)=>state.studentMarks);
    useEffect(()=>{
        dispatch(getMyMarks());
    },[])
    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>

  return (
    <div>
        <h2>My Marks</h2>
        {list.length==0 && <p>No Marks Available</p>}
        {list.map(m=>(
            <div key={m._id} style={{border:'1px solid #ccc',margin:'10px',padding:'10px'}}>
                <h4>{m.examType}</h4>
                <p>Tamil: {m.subjects.tamil}</p>
                <p>English: {m.subjects.english}</p>
                <p>Maths: {m.subjects.maths}</p>
                <p>Science: {m.subjects.science}</p>
                <p>Social: {m.subjects.social}</p>
                <b>Total: {m.total}</b>
                <p><b>Rank:{m.rank}</b></p>
            </div>
        ))}
    </div>
  )
}

export default StudentDashboard