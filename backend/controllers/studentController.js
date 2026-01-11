const User = require('../models/User');
const user=require('../models/User');
const bcrypt=require('bcrypt');

module.exports=registerStudent=async(req,res)=>{
    try{
    const {name,rollNo,password,className}=req.body;
    if(!rollNo || !password){
        return res.status(400).json({
            success:false,
            message:'Roll no and password required'
        })
    }
    const exists=await User.findOne({rollNo});
    if(exists){
        return res.status(403).json({
            success:false,
            message:'Student already registered'
        })
    }
    const hashedPassword=bcrypt.hash(password,10);
    const student=await User.create({
        name,
        rollNo,
        password:hashedPassword,
        role:'student',
        className
    });
    res.status(201).json({
        success:true,
        message:'Student registered successfully',
        student
    })
}
catch(error){
    res.status(400).json({
        success:false,
        message:'Student not registered',
        error
    })
}
}