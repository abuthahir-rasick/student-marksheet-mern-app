const express=require('express');
const { generatecaptcha } = require('../utils/captcha');

const router=express.Router();

router.get('/captcha',(req,res)=>{
    try{
        const captcha=generatecaptcha();
        req.session.captcha=captcha;
        res.status(200).json({
            success:true,
            message:'Catpcha got',
            captcha
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'captcha not get',
            error
        })
    }
})
module.exports=router;