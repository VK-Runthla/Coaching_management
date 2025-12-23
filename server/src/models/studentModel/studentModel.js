const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sessiontables",
    required: true, 
  },
  profilePhoto: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
