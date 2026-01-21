const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseType: {
        type: String,
        required: true,
        enum: ["Online", "Offline"]
    },
    duration: {
        type: String,
        required: true,
        enum: ["3", "6", "12", "24", "36", "48"]
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
        required: true,
        enum: ["Active", "Inactive"]
    }
})
const course = mongoose.model("courses", courseSchema)
module.exports = course;