import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyMarks } from '../redux/studentSlice';
import Tabs from '../components/Tabs';


const StudentDashboard = () => {
    const dispatch=useDispatch();
    const {list,loading,error}=useSelector((state)=>state.studentMarks);
     const tabs=['All','Quarterly','Halfyearly','Annual']
      const [activeTab,setActiveTab]=useState('All')
    const filteredMarks=activeTab==='All'?list:list.filter(m=>activeTab===m.examType);
    useEffect(()=>{
        dispatch(getMyMarks());
    },[])
    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>

  return (
    <div>
        <h2>My Marks</h2>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab!=='All' && filteredMarks.length===0 && (
            <p style={{color:'red'}}>{activeTab} marks not yet added</p>
        )}
        
        {filteredMarks.map(m=>(
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
        {filteredMarks.length>0 && <>
        <button type="button">Export Pdf</button>
        <button type="button">Export Docs</button>
        <button type="button">Export Excel</button>
        </>
        }
    </div>
  )
}

export default StudentDashboard