const jwt=require('jsonwebtoken');

const studentAuth=async(req,res,next)=>{
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
    if(decoded.role!=='student'){
       return res.status(403).json({
            success:false,
            message:'student only have access'
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
module.exports=studentAuth;