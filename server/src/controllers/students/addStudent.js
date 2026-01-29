const Student = require("../../models/studentModel/studentModel");
const { v4: uuidv4 } = require("uuid");


// ================= ENROLLMENT ID GENERATOR =================
function generateEnrollmentId() {
  const uuid = uuidv4();                
  const onlyNumbers = uuid.replace(/\D/g, ""); 
  return onlyNumbers.substring(0, 6);    
}


// ================= ADD STUDENT =================
exports.addStudent = async (req, res) => {
  try {
    const {
      name,
      gender,
      address,
      city,
      state,
      pincode,
      email,
      dob,
      joiningDate,
      session,

      contactNumber,
      aadharNumber,

      selectCourse,
      selectBatch,

      fatherName,
      motherName,
      guardianContact,
    } = req.body;

    // ---------- Required Fields Validation ----------
    if (
      !name ||
      !gender ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !email ||
      !dob ||
      !joiningDate ||
      !session ||
      !contactNumber ||
      !aadharNumber ||
      !selectCourse ||
      !selectBatch ||
      !fatherName ||
      !motherName ||
      !guardianContact
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ---------- Profile Photo ----------
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required",
      });
    }

    // ---------- DOB Validation (min 3 years) ----------
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

    // ---------- Contact Number ----------
    if (!/^[6-9]\d{9}$/.test(contactNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact number",
      });
    }

    // ---------- Aadhar ----------
    if (!/^\d{12}$/.test(aadharNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Aadhar number",
      });
    }

    // ---------- Duplicate Check ----------
    const existing = await Student.findOne({
      $or: [{ email }, { aadharNumber }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Student with same Email or Aadhar already exists",
      });
    }

    // ---------- Generate Enrollment ID ----------
    const enrollmentId = generateEnrollmentId();
    // console.log("Generated Enrollment ID:", enrollmentId);

    // ---------- Create Student ----------
    const student = new Student({
      enrollmentId, 

      name,
      gender,
      address,
      dob,
      joiningDate,
      session,
      city,
      state,
      pincode,
      email,

      contactNumber,
      aadharNumber,

      selectCourse,
      selectBatch,

      fatherName,
      motherName,
      guardianContact,

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


// ================= GET STUDENTS WITH SESSION =================
exports.getStudentsWithSession = async (req, res) => {
  try {
    const students = await Student.aggregate([
      {
        $lookup: {
          from: "sessiontables",
          localField: "session",
          foreignField: "_id",
          as: "sessionDetails",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.log("Error fetching students", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
