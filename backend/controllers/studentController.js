const User = require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

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