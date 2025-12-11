const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseType: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    coursePrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})
const course = mongoose.model("courses", courseSchema)
module.exports = course;