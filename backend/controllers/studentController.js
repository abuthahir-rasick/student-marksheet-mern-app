const User = require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

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
        const {rollNo,email}=req.body;
        const student=await User.findOne({rollNo,role:'student',email});
        if(!student){
            return res.status(400).json({
                success:false,
                message:'student not found'
            })
        }
       const otp=Math.floor(100000+Math.random()*900000).toString();
       student.otp=otp;
       student.otpExpiry=Date.now()+10*60*1000;
       student.otpVerified=false;
       await student.save();
       await sendEmail(
            email,
            'Password Reset Otp',
            `Your otp is ${otp}, It is valid for only 10 minutes`
        )
        res.status(201).json({
            success:true,
            message:'OTP send to registred email',
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'OTP sending failed',
            error
        })
    }
}
exports.studentVerifyOtp=async(req,res)=>{
    try {
            const {rollNo,otp}=req.body;
            const user=await User.findOne({rollNo,role:'student'});
            if(!user || user.otp!==otp || user.otpExpiry<Date.now()){
                return res.status(400).json({
                    success:false,
                    message:'invalid or expired OTP'
                })
            }
            user.otpVerified=true;
            await user.save();
            res.status(200).json({
                success:true,
                message:'Otp verified sucessfully',
            })
        } catch (error) {
            res.status(400).json({
                success:false,
                message:'invalid Otp',
                error
            })
        }
}
exports.resetStudentPassword=async(req,res)=>{
    try {
        const {rollNo,newPassword}=req.body;
        const user=await User.findOne({rollNo,role:'student'});
               if(!user){
                return res.status(404).json({
                    success:false,
                    message:'User not found'
                })
               }
               if(!user.otpVerified){
                return res.status(403).json({
                    success:false,
                    message:'OTP verification required'
                })
               }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        await User.findOneAndUpdate({rollNo},{
                    password:hashedPassword,
                    otp:null,
                    otpExpiry:null,
                    otpVerified:false
        })
        res.status(201).json({
            success:true,
            message:'password reset sucessfully'
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'something wrong ',
            error
        })
    }
}