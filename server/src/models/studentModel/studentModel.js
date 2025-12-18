const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  address: {
    type: String,
  },
  dob: {
    type: Date,
  },
  joiningDate: {
    type: Date,
  },
  session: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
});

module.exports = mongoose.model("Student", studentSchema);
