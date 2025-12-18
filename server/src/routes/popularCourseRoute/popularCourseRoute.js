const express = require("express");
const router = express.Router();
const PopularCourse = require("../../models/popularCourseModel/popularCourseModel");
const upload = require("../../utilities/multer");
const { addPopularCourse, deletePopularCourse, getPopularCourses, updatePopularCourse } = require("../../controllers/popularCourse/popularCourse");

router.post("/add-popular-course", upload.single("courseImage"), addPopularCourse);
router.delete("/delete-popular-course/:id", deletePopularCourse);
router.get("/get-popular-courses", getPopularCourses);
router.put("/update-popular-course/:id", upload.single("courseImage"), updatePopularCourse);


module.exports = router;