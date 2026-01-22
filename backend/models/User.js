const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollNo:{
        type:String,
        required:function(){
            return this.role==='student'
        }
    },
    email:{
        type:String,
        required:function(){
            return this.role==='teacher'
        }
    },
    password:{
        type:String,
        required:function(){
            return this.role==='teacher'
        }
    },
    role:{
        type:String,
        required:true,
        enum:["student","teacher"]
    },
    className:{
        type:String,
        required:true
    },
    dob:{
        type:Date
    },
    token:{
        type:String
    },
    otp:{
        type:String
    },
    otpExpiry:{
        type:Date
    },
    otpVerified:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model('User',userSchema);