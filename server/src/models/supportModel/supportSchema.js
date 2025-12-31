const mongoose = require("mongoose")
const supportSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    question: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum:["pending","solved"],
        default: "pending"
    },
}, { timestamps: true })

const supports = mongoose.model("supports", supportSchema);
module.exports = supports