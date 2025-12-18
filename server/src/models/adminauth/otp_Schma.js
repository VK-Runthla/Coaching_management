const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    expiry: {
        type: Number,
        required: true,
    },
    is_verified: {
        type: Boolean,
        default: false
    },
});
const Otp = mongoose.model("otp", otpSchema);
module.exports = Otp;