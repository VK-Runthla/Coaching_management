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
    if (!student.profilePhoto) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required",
      });
    }
    if (!name || !gender || !address || !dob || !joiningDate || !session) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


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



exports.getStudentsWithSession = async (req, res) => {
  try {
    const students = await Student.aggregate([
      {
        $lookup: {
          from: "sessiontables",   
          localField: "session",
          foreignField: "_id",
          as: "sessionDetails"
        }
      },
      
    ]);

    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    console.log("Error fetching students", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
