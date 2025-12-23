const mongoose = require("mongoose")


const AddadminSchma = new mongoose.Schema({
    adminName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    adminprofile: { type: String ,required:true},
    // Otp:Number

})
module.exports = mongoose.model('admin', AddadminSchma)
