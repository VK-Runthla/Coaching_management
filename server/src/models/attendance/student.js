const mongoose = require("mongoose");

const studentAttendance = new mongoose.Schema({
    enrollment_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Student",
        required: true
    },
    batch_id: {
        type: mongoose.Schema.ObjectId,
        ref: "batches",
        required: true
    },
    status : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("studentAttendances" , studentAttendance);