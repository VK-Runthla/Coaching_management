const express = require('express');
const { addCourse, updateCourse, deactiveCourse, getCourse, courseType,  } = require('../../controllers/academics/course');
const routerCourse = express.Router();

routerCourse.get('/get-course' , getCourse)
routerCourse.post('/add-course' , addCourse)
routerCourse.patch('/update-status' , deactiveCourse)
routerCourse.patch('/update-type' , courseType)
routerCourse.patch('/update-course' , updateCourse)

module.exports = routerCourse;