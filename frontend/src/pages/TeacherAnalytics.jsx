import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../redux/analyticsSlice';

const TeacherAnalytics = () => {
    const dispatch=useDispatch();
    const [examType,setExamType]=useState('Quarterly');
    const {data,loading,error}=useSelector(state=>state.analyticsSlice);
     useEffect(()=>{
        dispatch(getAnalytics(examType));
    },[examType,dispatch]); 
    if(loading) return <div>Loading....</div>
    
  return (
    <div>
        <h2>Class Analytics</h2>
         <select name='examType' value={examType} onChange={(e)=>setExamType(e.target.value)}>
                <option value='Quarterly'>Quarterly</option>
                <option value='Halfyearly'>Half-Yearly</option>
                <option value='Annual'>Annual</option>
            </select>
        {data && <>
        <h3>Class Average:{data.classAverage}</h3>
        <h4>Subject Average</h4>
        <ul>
            {Object.entries(data.subjectAverage).map(([k,v])=>(
                <li key={k}>{k}:{v.toFixed(2)}</li>
            ))}
        </ul>
        <h4>Topper</h4>
        <table border="1">
          <thead> <tr>
                <td>Name</td> <td>Roll No</td> <td>Total</td>
            </tr> </thead> 
            <tbody>{data && data.toppers.map((t,i)=>(<tr key={i}>
                <td>{t.name}</td> <td>{t.rollNo}</td> <td>{t.total}</td>
            </tr>))}</tbody>
        </table>
        
        </>}
        <h4>Rank List</h4>
         <table border="1">
          <thead> <tr>
                <td>Rank</td><td>Name</td> <td>Roll No</td> <td>Total</td>
            </tr> </thead> 
            <tbody>
                {data && data.ranks.map((r,i)=>(
                    <tr key={i}>
                        <td>{r.rank}</td>
                        <td>{r.name}</td>
                        <td>{r.rollNo}</td>
                        <td>{r.total}</td>
                    </tr>
                ))}
                </tbody>
                </table>

    </div>
  )
}

export default TeacherAnalytics