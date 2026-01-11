const jwt=require('jsonwebtoken');

const teacherAuth=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
      return  res.status(401).json({
            success:false,
            message:'no token provided'
        })
    }
    const token=authHeader.split(" ")[1];
    try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(decoded.role!=='teacher'){
       return res.status(403).json({
            success:false,
            message:'teacher only have access'
        })
    }
    req.user=decoded;
    next();
}
catch(err){
     res.status(401).json({
        success:false,
        message:'invalid token'
    })
}
}
module.exports=teacherAuth;