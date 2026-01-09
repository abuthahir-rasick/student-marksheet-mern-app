const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.login=async(req,res)=>{
    const {identifier,role,password}=req.body
    const user=await User.findOne({
        role,
        $or:[{email:identifier},{rollNo:identifier}]
    })
    if(!user){
        return res.status(400).json({msg:'User not found'})
    }
    const isValid=await bcrypt.compare(password,user.password)
    if(!isValid){
        return res.status(400).json({msg:'Password not match'})
    }
    const token=jwt.sign(
        {userId:user._id,role:user.role,className:user.className},
        process.env.TOKEN_SECRET,
        {expiresIn:'1d'}
    );
    res.json({token,role:user.role})
}