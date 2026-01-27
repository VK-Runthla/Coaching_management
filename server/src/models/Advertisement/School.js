
const mongoose = require('mongoose')
const SchoolImg = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploadImg: {
        type: String,
        require: true
    }
})

const School = mongoose.model('School' , SchoolImg)
module.exports = School