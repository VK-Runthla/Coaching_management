const sessionModel = require("../../models/academics/sessionsmodel")

const addsession = async (req, res) => {
    try {
        const { year, batches, description, isDefault } = req.body
        const add = new sessionModel({ year, batches, description, isDefault })
        add.save()
        res.send({ status: true, message: "session added successfully", add })
    }
    catch {
        res.send({ status: false, message: "error adding session" })
    }
}
const getsession = async (req, res) => {
    try {
        const { year } = req.query
        let matchcondtion = {}

        if (year) {
            matchcondtion.year = year

        }
        const getsessions = await sessionModel.aggregate([
            {
                $match: matchcondtion
            },
            {
                $project: {
                    year: 1,
                    batches: 1,
                    description: 1,
                    isDefault: 1

                }
            }
        ])
        res.send({ status: true, message: "session get successfully", getsessions })
    }
    catch {
        res.send({ status: false, message: "error geting session" })
    }
}
const updatesession = async (req, res) => {
    try {
        const { id } = req.params

        const { year, batches, isDefault, description } = req.body

        const update = await sessionModel.findByIdAndUpdate(id, { year, batches, isDefault, description }, { new: true })

        res.send({ status: true, message: "session update successfully", update })
    }
    catch {
        res.send({ status: false, message: "error updating session" })

    }
}
const deletesession = async (req, res) => {
    try {
        const { id } = req.params
        const deletes = await sessionModel.findByIdAndDelete(id)
        res.send({ status: true, message: "session delete successfully", })
    }
    catch {
        res.send({ status: false, message: "error deletinging session" })
    }
}

module.exports = { addsession, getsession, updatesession, deletesession }
