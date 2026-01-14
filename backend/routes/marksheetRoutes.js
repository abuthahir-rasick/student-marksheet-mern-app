const { addMarksheet, updateMarksheet, deleteMarksheet, getClassMarks, getMyMarks } = require("../controllers/marksheetController");
const teacherAuth = require("../middleware/teacherAuth");
const studentAuth=require('../middleware/studentAuth')

const express=require('express');


const router=express.Router();

router.post('/',teacherAuth,addMarksheet);
router.put('/:id',teacherAuth,updateMarksheet);
router.delete('/:id',teacherAuth,deleteMarksheet);
router.get('/all',teacherAuth,getClassMarks);

router.get('/my',studentAuth,getMyMarks);


module.exports=router; 