const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')


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
        const  reToken=jwt.sign(
            {id:teacher._id},
            process.env.JWT_SECRET,
            {expiresIn:'15m'}
        )
        res.status(201).json({
            success:true,
            msg:'retoken send successfully',
            reToken
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg:'token failed',
            error
        })
    }
}
exports.resetTeacherPassword=async(req,res)=>{
    const {token,password}=req.body;
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const hashedPassword=await bcrypt.hash(password,10);
        await User.findByIdAndUpdate(decoded.id,{
            password:hashedPassword
        })
        res.status(200).json({
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
exports.registerStudent=async(req,res)=>{
    const {name,rollNo,password,className}=req.body;
    try {
        if(!rollNo || !password){
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