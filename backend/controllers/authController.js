const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const generateOtp=()=>{
    return Math.floor(100000+Math.random()*900000).toString();
}
exports.registerTeacher=async(req,res)=>{
    try {
        const {name,email,password,className}=req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:'email and password required'
        });
    }
    const exist =await User.findOne({email});
    if(exist){
        return res.status(400).json({
            success:false,
            message:'Teacher already registered'
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const teacher=await User.create({
        name,
        email,
        password:hashedPassword,
        role:'teacher',
        className
    });
    res.status(201).json({
        success:true,
        message:'Teacher registered successfully',
        teacher
    })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Teacher not registered',
            error
        })
    }
}
exports.teacherLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const teacher=await User.findOne({email,role:'teacher'});
        if(!teacher){
            return res.status(400).json({
                success:false,
                meassage:'teacher not found'
            })
        }
        const isMatch=await bcrypt.compare(password,teacher.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:'password not match'
            })
        }
        const token=jwt.sign(
            {id:teacher._id,role:teacher.role},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )
        res.status(201).json({
            success:true,
            message:'Teacher loggedIn successfully',
            token
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'login failed',
            error
        })
    }
}
exports.teacherForgotPassword=async(req,res)=>{
    try {
        const {email}=req.body;
        const teacher=await User.findOne({email,role:'teacher'});
        if(!teacher){
            return res.status(400).json({
                success:false,
                msg:'Teacher not found'
            })
        }
        const otp=generateOtp();
        teacher.otp=otp;
        teacher.otpExpiry=Date.now()+10*60*1000;
        teacher.otpVerified=false;
        await teacher.save();
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
            message:'Otp sending failed',
            error
        })
    }
}
exports.otpVerify=async(req,res)=>{
    try {
        const {email,otp}=req.body;
        const user=await User.findOne({email,role:'teacher'});
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
exports.resetTeacherPassword=async(req,res)=>{
    const {email,newPassword}=req.body;
    try {
       const user=await User.findOne({email,role:'teacher'});
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
        await User.findOneAndUpdate({email},{
            password:hashedPassword,
            otp:null,
            otpExpiry:null,
            otpVerified:false
        })
        res.status(200).json({
            success:true,
            message:'password reset sucessfully'
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'password reset failed',
            error
        })
    }
}

exports.registerStudent=async(req,res)=>{
    const {name,rollNo,email,password,className}=req.body;
    try {
        if(!rollNo ||!email || !password){
            return res.status(400).json({
                success:false,
                msg:"roll no and password are required"
            });
        }
        const exists=await User.findOne({rollNo});
        if(exists){
            return res.status(403).json({
                success:false,
                msg:'student already exists'
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const student=await User.create({
            name,
            rollNo,
            email,
            password:hashedPassword,
            role:'student',
            className
        })
        res.status(201).json({
            success:true,
            message:'student registration successful',
            student
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'student registration failed',
            error
        })
    }
}