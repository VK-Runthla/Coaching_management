const mongoose = require("mongoose")
const Subject = require("../../models/Subject")

const addSubject = async (req, res) => {
    try {
        const { subjectName, courseId } = req.body

        if (!subjectName || !courseId) {
            return res.send({ status: false, message: "Subject name and courseId are required" })
        }

        const exist = await Subject.findOne({ subjectName, courseId })
        if (exist) {
            return res.send({ status: false, message: "Subject already exists for this course" })
        }

        const data = await Subject.create({ subjectName, courseId })
        return res.send({ status: true, message: "Subject added successfully", data })


    } catch (err) {
        return res.send({ status: false, message: "Server error", err })
    }
}

const updateSubject = async (req, res) => {
    try {
        const { subjectName, courseId } = req.body
        const { id } = req.params

        if (!id) {
            return res.send({ status: false, message: "id not found, try correct id" })
        }

        const updatedData = await Subject.findByIdAndUpdate(id, { subjectName, courseId }, { new: true })

        if (!updatedData) {
            return res.send({ status: false, message: "Subject not found" })
        }

        return res.send({ status: true, message: "Subject updated successfully", data: updatedData })

    } catch (err) {
        return res.send({ status: false, message: "Server error", err })
    }
}


module.exports = { addSubject, updateSubject }
