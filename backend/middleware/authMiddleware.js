const jwt=require('jsonwebtoken');

module.exports=(roles=[])=>{
    return (req,res,next)=>{
        const token=req.headers.authorization?.split('')[1];
        if(!token){
            return res.status(401).json({msg:'no token'})
        }
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            if(roles.length && !roles.decode.role){
                return res.status(403).json({msg:'Access denied'});
            }
            req.user=decoded;
            next();
        } catch (error) {
            return res.status(401).json({msg:'Invalid token'})
        }
    }
}