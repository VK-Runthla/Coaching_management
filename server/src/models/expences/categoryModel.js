const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{
    timestamp:true
})

module.exports = new mongoose.model('expenceCategory',categorySchema)