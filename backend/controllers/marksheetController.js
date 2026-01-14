const Marksheet=require('../models/Marksheet');

exports.addMarksheet=async(req,res)=>{
    try{
        const {studentId,examType,subjects}=req.body
    const total=Object.values(subjects).reduce((sum,m)=>sum+m);
    const marksheet=await Marksheet.create({
        studentId,
        examType,
        subjects,
        total,
        createdBy:req.user.id
    })
    res.status(201).json({
        success:true,
        message:'marksheet added successfully',
        marksheet
    })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:'marksheet not added',
            error
        })
    }
}
exports.updateMarksheet=async(req,res)=>{
    try {
        const {subjects}=req.body;
        const total=Object.values(subjects).reduce((sum,m)=>sum+m);
        const updated=await Marksheet.findByIdAndUpdate(req.params.id,
            {subjects,total},
            {new:true}
        )
        res.status(201).json({
            success:true,
            message:'marksheet updated successfully',
            updated
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'marksheet not updated',
            error
        })
    }
}
exports.deleteMarksheet=async(req,res)=>{
    try{
        await Marksheet.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:'marksheet deleted successfully'
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:'marksheet not deleted',
        })
    }
}

exports.getMyMarks=async(req,res)=>{
   try{
     const marks=await Marksheet.find({studentId:req.user.id}).sort({createdAt:-1});
     if(marks.length==0){
        return res.status(403).json({
            success:false,
            message:'marksheet not found'
        })
     }
    res.status(200).json({
        success:true,
        message:'marksheet got successfully',
        marks
    });
   }
   catch(error){
    res.status(400).json({
        success:false,
        messgae:'marksheet not found',
        error
    })
   }
}

exports.getClassMarks=async(req,res)=>{
    try{
    const marks=await Marksheet.find().populate('StudentId','name rollNo className').sort({createdAt:-1});
    res.status(200).json({
        success:true,
        message:'marksheet got successfully',
        marks
    });
}
    catch(error){
    res.status(400).json({
        success:false,
        messgae:'marksheet not found',
        error
    })
   }
    
}