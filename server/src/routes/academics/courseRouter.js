const express = require('express');
const { addCourse, updateCourse, deactiveCourse, getCourse } = require('../../controllers/academics/course');
const routerCourse = express.Router();

routerCourse.get('/get-course' , getCourse)
routerCourse.post('/add-course' , addCourse)
routerCourse.patch('/update-status' , deactiveCourse)
routerCourse.patch('/update-course' , updateCourse)

module.exports = routerCourse;