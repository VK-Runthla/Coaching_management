const School = require('../../models/Advertisement/School')

const addSchoolImg = async (req, res) => {
    try {
        const { title, description } = req.body

        if (!title || !description) {
            return res.send({ status: false, message: 'All fields required' })
        }

        if (!req.file) {
            return res.send({ status: false, message: 'Image required' })
        }

        const data = await School.create({ title, description, uploadImg: req.file.filename })

        return res.send({ status: true, message: 'School image added successfully', data })

    } catch (err) {
        console.log(err)
        return res.send({ status: false, message: err.message })
    }
}

const getSchoolImg = async (req, res) => {
    try {
        const data = await School.find()
        return res.send({ status: true, data })
    } catch (err) {
        return res.send({ status: false, message: err.message })
    }
}

const UpdateSchoolData = async (req, res) => {
    try {
        const { title, description } = req.body
        const { id } = req.params

        console.log(req.body)
        console.log(req.file)

        if (!id) return res.send({ status: false, message: "id required" })

        const updateData = { title, description }
        if (req.file) updateData.uploadImg = req.file.filename

        const data = await School.findByIdAndUpdate(id, updateData, { new: true })

        return res.send({ status: true, message: "Updated successfully", data })
    } catch (err) {
        console.log(err)
        return res.send({ status: false, message: "something went wrong again try !" })
    }
}


const DeleteSchoolData = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.send({ status: false, message: "id required" })
        }

        const data = await School.findByIdAndDelete(id)

        if (!data) {
            return res.send({ status: false, message: "Data not found" })
        }

        return res.send({ status: true, message: "Deleted successfully", data })

    } catch (err) {
        console.log(err)
        return res.send({ status: false, message: "something went wrong again try !" })
    }
}



module.exports = { addSchoolImg, getSchoolImg, UpdateSchoolData, DeleteSchoolData }
