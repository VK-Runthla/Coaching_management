const mongoose = require("mongoose");
const { addSubject } = require("./academics/Subject");
// const Addsubject = require("../models/Addstudentschema");

const addsubjets = async (req, res) => {
  try {
    const { EnterStudentName, courseid } = req.body;
    const student = await Addsubject.create({ EnterStudentName, courseid });
    student.save();

    res.send({ ststus: true, message: "Student add successfuly" })
  }
  catch {
    res.send({ status: true, message: "  student error    " })
  }
}

const deletesubject=async(req, res )=>{
  try{
const { id }=req.params;
await addSubject.findByIdAndDelete(id);
res.sent({ststus:true , message:" student delete successfully"})
  }
  catch{
    res.send({ ststus: true , message: " not delete student "})
  }
 }
module.exports = { addsubjets , deletesubject }