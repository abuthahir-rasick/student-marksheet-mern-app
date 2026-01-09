const mongoose=require('mongoose');

const marksheetSchema=new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    examType:{
        type:String,
        enum:['Quarterly','Halfyearly','Annual']
    },
    subjects:{
        tamil:Number,
        english:Number,
        maths:Number,
        science:Number,
        social:Number
    },
    class:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports=mongoose.model("Marksheet",marksheetSchema);