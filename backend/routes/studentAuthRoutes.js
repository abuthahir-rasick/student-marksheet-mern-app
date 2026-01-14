const express=require('express');
const { loginStudent, studentForgotPassword, resetStudentPassword, studentVerifyOtp } = require('../controllers/studentController');

const router=express.Router();

router.post('/login',loginStudent);
router.post('/forgot-password',studentForgotPassword);
router.post('/verify-otp',studentVerifyOtp);
router.post('/reset-password',resetStudentPassword);

module.exports=router;