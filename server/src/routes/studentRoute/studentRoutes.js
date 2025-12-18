const express = require("express");
const router = express.Router();
// const upload = require("../../uploads");
const { addStudent } = require("../../controllers/students/addStudent");
const upload = require("../../utilities/multer");



router.post("/add-student",upload.single("profilePhoto"),addStudent);

module.exports = router;
