const mongoose = require('mongoose');
const batches = new mongoose.Schema({
    batchName:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    start:{
        type:String,
        required:true,
        enum:["am","pm"]
    },
    end:{
        type:String,
        required:true,
        enum:["am","pm"]
    }
})

const batcheSchema = mongoose.model("batches",batches);
module.exports = batcheSchema;