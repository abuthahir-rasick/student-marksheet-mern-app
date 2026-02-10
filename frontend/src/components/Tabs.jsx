import React from 'react'

const Tabs = ({tabs,activeTab,setActiveTab}) => {
  return (
    <div>
      <div style={{display:'flex',gap:'10px',marginBottom:'20px'}}>
        {tabs.map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)}
            style={{padding:'8px 16px',cursor:'pointer',borderBottom:activeTab===tab?'2px solid blue':'none',
                fontWeight:activeTab===tab?'bold':'normal'
            }}
            >{tab}</button>
        ))}
      </div>
    </div>
  )
}

export default Tabs
