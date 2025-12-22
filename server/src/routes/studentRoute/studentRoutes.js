const express = require("express");
const router = express.Router();
// const upload = require("../../uploads");
const { addStudent, getStudentsWithSession } = require("../../controllers/students/addStudent");
const upload = require("../../utilities/multer");



router.post("/add-student",upload.single("profilePhoto"),addStudent);
router.get("/with-session", getStudentsWithSession);


module.exports = router;
