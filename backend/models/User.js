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
    }
})
module.exports=mongoose.model('User',userSchema);