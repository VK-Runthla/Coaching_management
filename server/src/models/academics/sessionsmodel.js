const mongoose=require("mongoose")

const sessionSchema =new mongoose.Schema({
    year:{
        type:String,
        require:true        
    },
    batches:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    isDefault:{
        type:Boolean,
        default:false
    },

})

const sessionModel=mongoose.model("sessiontables",sessionSchema)
module.exports=sessionModel