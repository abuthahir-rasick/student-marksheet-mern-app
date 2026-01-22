const User = require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.loginStudent=async(req,res)=>{
    try{
    const {rollNo,dob,captcha}=req.body;
    
    const student=await User.findOne({rollNo,role:'student'});
    if(!student){
        return res.status(403).json({
            success:false,
            message:'invalid rollNo'
        })
    }
   if(!req.session.captcha || captcha!==req.session.captcha){
    return res.status(400).json({
        success:false,
        message:'Invalid captcha'
    })
   }
   const dbDob=new Date(student.dob).toISOString().split('T')[0];
   if(dbDob!==dob){
    return res.status(401).json({
        success:false,
        message:"Dob is wrong"
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
req.session.captcha=null;
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