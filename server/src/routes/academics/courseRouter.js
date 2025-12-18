const express = require('express');
const { addCourse, updateCourse, deactiveCourse } = require('../../controllers/academics/course');
const routerCourse = express.Router();

routerCourse.get('/get-course' , addCourse)
routerCourse.post('/add-course' , addCourse)
routerCourse.patch('/update-status' , deactiveCourse)
routerCourse.patch('/update-course' , updateCourse)

module.exports = routerCourse;