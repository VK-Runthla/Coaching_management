const mongoose = require("mongoose")


const AddadminSchma = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    adminprofile: { type: String },
    // Otp:Number

})
module.exports = mongoose.model('admin', AddadminSchma)
