const mongoose=require("mongoose")

const sessionSchema =new mongoose.Schema({
    year:{
        type:String,
        required:true        
    },
    batches:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isDefault:{
        type:Boolean,
        default:false
    },

})

const sessionModel=mongoose.model("sessiontables",sessionSchema)
module.exports=sessionModel