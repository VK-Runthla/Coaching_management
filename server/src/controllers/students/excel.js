const ExcelJS = require("exceljs");
const mongoose = require("mongoose");
const Student = require("../../models/studentModel/studentModel");

exports.exportStudentsToExcel = async (req, res) => {
  try {
    const { selectCourse, selectBatch } = req.query;

    if (!selectCourse || !selectBatch) {
      return res.status(400).json({
        success: false,
        message: "selectCourse and selectBatch are required",
      });
    }

    const students = await Student.aggregate([
      {
        $match: {
          selectCourse: new mongoose.Types.ObjectId(selectCourse),
          selectBatch: new mongoose.Types.ObjectId(selectBatch),
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "selectCourse",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },

      {
        $lookup: {
          from: "batches",
          localField: "selectBatch",
          foreignField: "_id",
          as: "batch",
        },
      },
      { $unwind: "$batch" },

      {
        $lookup: {
          from: "sessiontables",
          localField: "session",
          foreignField: "_id",
          as: "session",
        },
      },
      { $unwind: "$session" },

      {
        $project: {
          name: 1,
          gender: 1,
          email: 1,
          contactNumber: 1,
          aadharNumber: 1,
          fatherName: 1,
          motherName: 1,
          courseName: "$course.courseName",
          batchName: "$batch.batchName",
          sessionName: "$session.sessionName",
        },
      },
    ]);

    if (!students.length) {
      return res.status(404).json({
        success: false,
        message: "No students found",
      });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    worksheet.columns = [
      { header: "S No", key: "sno", width: 8 },
      { header: "Name", key: "name", width: 20 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Email", key: "email", width: 25 },
      { header: "Contact", key: "contactNumber", width: 15 },
      { header: "Aadhar", key: "aadharNumber", width: 18 },
      { header: "Course", key: "courseName", width: 20 },
      { header: "Batch", key: "batchName", width: 15 },
      { header: "Session", key: "sessionName", width: 15 },
      { header: "Father Name", key: "fatherName", width: 20 },
      { header: "Mother Name", key: "motherName", width: 20 },
    ];
    // added row with serial number
    let counter = 1;
    students.forEach((stu) => {
      worksheet.addRow({ sno: counter++, ...stu });
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Browser download headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Excel Export Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
