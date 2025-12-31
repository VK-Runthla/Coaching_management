const mongoose = require('mongoose');
const expenceSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    referenceBy:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    paymentMode:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"expencecategories",
        required:true
    },
    description:{
        type:String,
    }
},{
    timestamp:true
})

module.exports = new mongoose.model('expences',expenceSchema)