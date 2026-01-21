const Marksheet=require('../models/Marksheet');

exports.getAnalytics=async(req,res)=>{
    try {
        const {examType}=req.query;
    const className=req.user.className;

    const marksheets=await Marksheet.find({examType}).populate({
        path:'studentId',
        match:{className},
        select:"name rollNo"
    })
    const validMarks=marksheets.filter(m=>m.studentId);
    if(validMarks.length===0){
        return res.status(200).json({
            success:true,
            message:"No data",
            analytics:{}
        })
    }
    
    const classAverage=validMarks.reduce((sum,m)=>sum+m.total,0)/validMarks.length;
    const subjectAvg={};
    const subject=['tamil','english','maths','science','social'];
    subject.forEach(sub=>{
        subjectAvg[sub]=validMarks.reduce((sum,m)=>sum+m.subjects[sub],0)/validMarks.length;
    })
    const highestTotal=Math.max(...validMarks.map(m=>m.total));
    const toppers=validMarks.filter(m=>m.total===highestTotal).map(m=>({
        name:m.studentId.name,
        rollNo:m.studentId.rollNo,
        total:m.total
    }))
    const topper=[...validMarks].sort((a,b)=>b.total-a.total)[0];
    const sortedMarks=[...validMarks].sort((a,b)=>b.total-a.total);
    let currentRank=1;
    let prevTotal=null;
    const rankList=sortedMarks.map((m,index)=>{
        if(prevTotal!==null && m.total<prevTotal){
            currentRank=index+1;
        }
        prevTotal=m.total;
        return{
        rank:currentRank,
        name:m.studentId.name,
        rollNo:m.studentId.rollNo,
        total:m.total
    }})
    res.status(200).json({
        success:true,
        message:'Analytics Created',
        analytics:{
            classAverage:Number(classAverage.toFixed(2)),
            subjectAverage:subjectAvg,
            toppers,
            ranks:rankList
        }
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Analytics failed',
            error
        })
    }
}