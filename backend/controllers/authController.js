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
    const hashedPassword=bcrypt.hash(password,10);
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
        const isMatch=bcrypt.compare(password,teacher.password);
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
        const teacher=await User.findOne()
    } catch (error) {
        
    }
}