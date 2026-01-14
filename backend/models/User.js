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
        required:true
    },
    password:{
        type:String,
        required:true
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