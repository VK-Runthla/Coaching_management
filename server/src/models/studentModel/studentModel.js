const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  enrollmentNumber: {
    type: String,
    // unique: true,
    // required: true,
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
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    required: true,
    unique: true,
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

  //page 2
  contactNumber: {
    type:String,
    required: true,
  },
  aadharNumber:{
    type:String,
    required:true,
    unique:true,
  },

  //page 3
  selectCourse:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true, 
  },
  selectBatch:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "batches",
    required: true,
  
  },
  // page 4
  fatherName:{
    type:String,
    required:true,
  },
  motherName:{
    type:String,
    required:true,
  },
  guardianContact:{
    type:String,
    required:false,
  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },


});

module.exports = mongoose.model("Student", studentSchema);
