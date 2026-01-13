const express=require('express');
const { loginStudent, studentForgotPassword, resetStudentPassword } = require('../controllers/studentController');

const router=express.Router();

router.post('/login',loginStudent);
router.post('/forgot-password',studentForgotPassword);
router.post('/reset-password',resetStudentPassword);

module.exports=router;