const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
        trim: true
    },
    courseId: {
        type: mongoose.Schema.ObjectId,
        ref: "courses",
        required: true
    }
})


const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject 
