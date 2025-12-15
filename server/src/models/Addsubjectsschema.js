const mongoose = require("mongoose");
const subjectschema = mongoose.Schema({
    EnterSubjectName: {
        type: String,
        required: true
    },
    courseid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
        required: true
    }

})
const Addsubject = mongoose.model("addsubject", subjectschema)
module.exports = Addsubject;

