const Student = require("../../models/studentModel/studentModel");

// adding student details 
exports.addStudent = async (req, res) => {
  try {
    const {
      // Page 1
      name,
      gender,
      address,
      dob,
      joiningDate,
      session,

      contactNumber,
      aadharNumber,

      selectCourse,
      selectBatch,

      fatherName,
      motherName,
    } = req.body;


    if (
      !name ||
      !gender ||
      !address ||
      !dob ||
      !joiningDate ||
      !session ||
      !contactNumber ||
      !aadharNumber ||
      !selectCourse ||
      !selectBatch ||
      !fatherName ||
      !motherName
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Profile photo validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required",
      });
    }

    // DOB validation (minimum 3 years old)
    const dobDate = new Date(dob);
    const today = new Date();
    const threeYearsAgo = new Date(
      today.getFullYear() - 3,
      today.getMonth(),
      today.getDate()
    );

    if (dobDate > threeYearsAgo) {
      return res.status(400).json({
        success: false,
        message: "Date of Birth must be at least 3 years earlier than today",
      });
    }

    //Contact number validation 
    if (!/^[6-9]\d{9}$/.test(contactNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact number",
      });
    }

    //  Aadhar validation (12 digits)
    if (!/^\d{12}$/.test(aadharNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Aadhar number",
      });
    }

    // Create student
    const student = new Student({
      name,
      gender,
      address,
      dob,
      joiningDate,
      session,

      contactNumber,
      aadharNumber,

      selectCourse,
      selectBatch,

      fatherName,
      motherName,

      profilePhoto: req.file.filename,
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


// get all student with session etails 

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
