const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const session=require('express-session');
const dbConnect = require('./config/db');
const authRoutes=require('./routes/authRoutes');
const marksheetRoutes=require('./routes/marksheetRoutes');
const studentAuthRoutes=require('./routes/studentAuthRoutes');
const analyticsRoutes=require('./routes/analyticsRoutes');
const captchaRoutes=require('./routes/captchaRoutes');


dotenv.config();
dbConnect();

const app=express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(session({
    secret:process.env.SECRET_SESSION || 'school_sceret',
    resave:false,
    saveuninitialized:false,
    cookie:{secure:false}
}))

app.use('/api/auth',authRoutes);
app.use('/api/student-auth',studentAuthRoutes);
app.use('/api/marksheet',marksheetRoutes);
app.use('/api/analytics',analyticsRoutes);
app.use('/api',captchaRoutes)

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})