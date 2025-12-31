const mongoose = require('mongoose');
const batches = new mongoose.Schema({
    batchName:{
        type:String,
        required:true
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"courses",
        required:true
    },
    start:{
        type:String,
        required:true,
    },
    end:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["active","inActive"],
        default:"active"
    }
},{timestamps:true})

const batcheSchema = mongoose.model("batches",batches);
module.exports = batcheSchema;