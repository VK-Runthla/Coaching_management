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
        // enum:["am","pm"]
    },
    end:{
        type:String,
        required:true,
        // enum:["am","pm"]
    }
},{timestamps:true})

const batcheSchema = mongoose.model("batches",batches);
module.exports = batcheSchema;