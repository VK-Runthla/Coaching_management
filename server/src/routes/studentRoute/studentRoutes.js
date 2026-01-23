const express = require("express");
const router = express.Router();
// const upload = require("../../uploads");
const { addStudent, getStudentsWithSession } = require("../../controllers/students/addStudent");
const upload = require("../../utilities/multer");
const { exportStudentsToExcel } = require("../../controllers/students/excel");



router.post("/add-student",upload.single("profilePhoto"),addStudent);
router.get("/with-session", getStudentsWithSession);

router.get("/export-students", exportStudentsToExcel);

module.exports = router;
