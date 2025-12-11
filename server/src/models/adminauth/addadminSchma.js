const mongoose = require("mongoose")


const AddadminSchma = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    MobileNumber: { type: Number, required: true, unique: true },
    Password: { type: String, required: true },
    Adminprofile: { type: String },
    // Otp:Number

})
module.exports = mongoose.model('admin', AddadminSchma)
