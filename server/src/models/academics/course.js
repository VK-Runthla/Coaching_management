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
        enum: ["3 Months", "6 Months", "1 Year", "2 Years", "3 Years", "4 Years"]
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
    },
    batch_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batches",
        required: true
    }
})
const course = mongoose.model("courses", courseSchema)
module.exports = course;