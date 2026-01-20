const mongoose = require("mongoose")
const Subject = require("../../models/academics/Subject")

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



const getSubject = async (req, res) => {
    try {
        const { subjectName, courseId, limit = 1, page } = req.query

        const pageNumber = parseInt(page) || 1
        const limitNumber = parseInt(limit)
        const skip = (pageNumber - 1) * limitNumber

        const match = {}

        if (subjectName) {
            match.subjectName = subjectName
        }

        if (courseId) {
            match.courseId = new mongoose.Types.ObjectId(courseId)
        }

        const data = await Subject.aggregate([
            { $match: match },
            {
                $lookup: {
                    from: "courses",
                    localField: "courseId",
                    foreignField: "_id",
                    as: "courseData"
                }
            },
            { $unwind: { path: "$courseData", preserveNullAndEmptyArrays: true } }, { $skip: skip }, { $limit: limitNumber }
        ])

        return res.send({ status: true, message: "success", data })

    } catch (err) {
        return res.send({ status: false, message: "server error", err })
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

const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.send({ status: false, message: "id not found, try correct id" })
        }
        await Subject.findByIdAndDelete(id)
        return res.send({ status: true, message: "Subject delete successfully" })
    } catch (err) {
        return res.send({ status: false, message: "Server error", err })
    }
}


module.exports = { addSubject, getSubject, updateSubject, deleteSubject }
