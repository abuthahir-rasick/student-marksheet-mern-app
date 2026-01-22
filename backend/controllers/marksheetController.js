const Marksheet=require('../models/Marksheet');
const User=require('../models/User')

exports.addMarksheet=async(req,res)=>{
    try{
        const {rollNo,examType,subjects}=req.body
        const student=await User.findOne({rollNo,role:'student'});
        if(!student){
            return res.status(404).json({
                success:false,
                message:'student not found'
            })
        }
    const total=Object.values(subjects).reduce((sum,m)=>sum+m);
    const marksheet=await Marksheet.create({
        studentId:student._id,
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
        const {examType,subjects}=req.body;
        const total=Object.values(subjects).reduce((sum,m)=>sum+m);
        const updated=await Marksheet.findByIdAndUpdate(req.params.id,
            {examType,subjects,total},
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
    const studentId=req.user.id;
    const className=req.user.className
     const marks=await Marksheet.find({studentId});
     if(marks.length==0){
        return res.status(404).json({
            success:false,
            message:'marksheet not found'
        })
     }
     const marksWithRank=await Promise.all(
        marks.map(async (m)=>{
            const sameClassStudents=await Marksheet.find({
                examType:m.examType
            }).populate({
                path:'studentId',
                match:{className},
                select:"_id"
            })
            const validMarks=sameClassStudents.filter(x=>x.studentId);
            const higherCount=validMarks.filter(x=>x.total>m.total).length;
            return{
                ...m.toObject(),
                rank:higherCount+1
            }
        })
     );
    res.status(200).json({
        success:true,
        message:'marksheet got successfully',
        marks:marksWithRank
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
    const marks=await Marksheet.find().populate('studentId','name rollNo className').sort({createdAt:-1});
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