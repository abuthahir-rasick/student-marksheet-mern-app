const User = require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

exports.loginStudent=async(req,res)=>{
    try{
    const {rollNo,password}=req.body;
    
    const student=await User.findOne({rollNo,role:'student'});
    if(!student){
        return res.status(403).json({
            success:false,
            message:'invalid rollNo'
        })
    }
    const isMatch=await bcrypt.compare(password,student.password);
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:'invalid password'
        })
    }
    const token=jwt.sign({
        id:student._id,
        rollNo:student.rollNo,
        role:'student',
        className:student.className
    },
    process.env.JWT_SECRET,
    {expiresIn:'1d'}
);
    res.status(201).json({
        success:true,
        message:'Student loggedIn successfully',
        token
    })
}
catch(error){
    res.status(400).json({
        success:false,
        message:'student logIn failed',
        error
    })
}
}
exports.studentForgotPassword=async(req,res)=>{
    try {
        const {rollNo}=req.body;
        const student=await User.findOne({rollNo,role:'student'});
        if(!student){
            return res.status(400).json({
                success:false,
                message:'student not found'
            })
        }
        const retoken=jwt.sign(
            {id:student._id,role:'student'},
            process.env.JWT_SECRET,
            {expiresIn:'15m'}
        )
        res.status(201).json({
            success:true,
            message:'retoken send sucessfully',
            retoken
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'token failed',
            error
        })
    }
}
exports.resetStudentPassword=async(req,res)=>{
    try {
        const {token,newPassword}=req.body;
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role!=='student'){
            return res.status(403).json({
                status:false,
                message:'invalid token'
            })
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        await User.findByIdAndUpdate(decoded.id,{
            password:hashedPassword
        })
        res.status(201).json({
            success:true,
            message:'password reset sucessfully'
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'invalid or token expired',
            error
        })
    }
}