const Marksheet=require('../models/Marksheet');

exports.addMarksheet=async(req,res)=>{
    const {studentId,examType,subjects}=req.body
    const total=Object.values(subjects).reduce((a,b)=>a+b);
    const marksheet=await Marksheet.create({
        studentId,
        examType,
        subjects,
        total,
        createdBy:req.user.id
    })
    res.json(marksheet)
}

exports.getMarksheet=async(req,res)=>{
    const marks=await Marksheet.find({studentId:req.params.id});
    res.json(marks);
}

exports.getClassMarks=async(req,res)=>{
    const marks=await Marksheet.find().populate('StudentId','name marks className');
    res.json(marks);
}