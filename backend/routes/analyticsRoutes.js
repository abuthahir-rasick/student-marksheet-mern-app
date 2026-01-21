const express=require('express');
const teacherAuth = require('../middleware/teacherAuth');
const { getAnalytics } = require('../controllers/analyticsContoller');

const router=express.Router();

router.get('/class',teacherAuth,getAnalytics);

module.exports=router;