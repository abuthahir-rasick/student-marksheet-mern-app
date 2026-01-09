const { login } = require("../controllers/authController");

const express=('express');
const router=express.Router();

router.post('/login',login);
module.exports=router;