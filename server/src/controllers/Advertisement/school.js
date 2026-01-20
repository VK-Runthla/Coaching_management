// const School = require('../../models/Advertisement/School')

// const addSchoolImg = async (req, res) => {
//     try {
//         const { title, description } = req.body

//         if (!title || !description || !req.file) {
//             return res.send({ status: false, message: "All fields required" })
//         }

//         const data = await School.create({ title, description, uploadImg: req.file.filename })

//         return res.send({ status: true, message: "School image added successfully", data })

//     } catch (err) {
//         res.send({ status: false, message: "Server error", err: err })
//     }
// }

// module.exports = { addSchoolImg }


// controllers/courseController.js
const Course = require("../models/Course")
const Subject = require("../models/Subject")
const CourseSubject = require("../models/CourseSubject")

const COMMON_SUBJECTS = ["HTML", "CSS"]

const addCourse = async (req, res) => {
    try {
        const { courseName } = req.body

        // 1. course create
        const course = await Course.create({ name: courseName })

        // 2. common subjects loop
        for (let subName of COMMON_SUBJECTS) {

            // subject find ya create
            let subject = await Subject.findOne({ name: subName })
            if (!subject) {
                subject = await Subject.create({ name: subName })
            }

            // mapping create
            await CourseSubject.create({
                courseId: course._id,
                subjectId: subject._id
            })
        }

        res.send({
            status: true,
            message: "Course created & common subjects auto added"
        })

    } catch (err) {
        res.send({ status: false, error: err.message })
    }
}

module.exports = { addCourse }
