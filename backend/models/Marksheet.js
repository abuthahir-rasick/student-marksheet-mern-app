const mongoose=require('mongoose');

const marksheetSchema=new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    examType:{
        type:String,
        enum:['Quarterly','Halfyearly','Annual'],
        required:true
    },
    subjects:{
        tamil:Number,
        english:Number,
        maths:Number,
        science:Number,
        social:Number
    },
   total:Number,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

module.exports=mongoose.model("Marksheet",marksheetSchema);