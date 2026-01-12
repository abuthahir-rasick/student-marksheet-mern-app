/* const express=('require');
const { addMarksheet, getMarksheet, getClassMarks } = require('../controllers/marksheetController');
const auth=require('../middleware/authMiddleware');

const router=express.Router();

router.post('/',auth(['teacher']),addMarksheet);
router.get('/student/:id',auth['student','teacher'],getMarksheet);
router.get('/class',auth(['teacher']),getClassMarks);

exports.module=router; */