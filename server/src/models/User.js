const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    subject_name: {
        type: String,
        required: true
    },
    Course: {
        type: String,
        required: true
    }
})

const Subject = mongoose.model('subject', SubjectSchema)
module.exports = Subject