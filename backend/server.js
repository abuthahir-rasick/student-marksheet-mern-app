const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const dbConnect = require('./config/db');
const authRoutes=require('./routes/authRoutes');
const marksheetRoutes=require('./routes/marksheetRoutes');
const studentAuthRoutes=require('./routes/studentAuthRoutes');
const analyticsRoutes=require('./routes/analyticsRoutes');


dotenv.config();
dbConnect();

const app=express();
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/api/student-auth',studentAuthRoutes);
app.use('/api/marksheet',marksheetRoutes);
app.use('/api/analytics',analyticsRoutes)

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})