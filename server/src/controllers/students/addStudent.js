const Student = require("../../models/studentModel/studentModel");

exports.addStudent = async (req, res) => {
  try {
    const { name, gender, address, dob, joiningDate, session } = req.body;

    const student = new Student({
      name,
      gender,
      address,
      dob,
      joiningDate,
      session,
      profilePhoto: req.file ? req.file.filename : null,
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: student,
    });
  } catch (error) {
    console.log("Error adding student", error);
    res.status(500).json({
      success: false,
      message: error.message,

    });
  }
};
