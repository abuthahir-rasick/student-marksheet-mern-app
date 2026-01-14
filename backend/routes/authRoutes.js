const { registerTeacher, teacherLogin, teacherForgotPassword, resetTeacherPassword, registerStudent, otpVerify } = require("../controllers/authController");

const express=require('express');
const teacherAuth = require("../middleware/teacherAuth");
const router=express.Router();

router.post('/register-teacher',registerTeacher)
router.post('/login-teacher',teacherLogin)
router.post('/forgot-password-teacher',teacherForgotPassword);
router.post('/verify-otp',otpVerify);
router.post('/reset-password-teacher',resetTeacherPassword)
router.post('/register-student',teacherAuth,registerStudent);
module.exports=router;