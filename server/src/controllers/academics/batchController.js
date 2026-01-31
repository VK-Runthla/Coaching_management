const { default: mongoose } = require("mongoose");
const batcheSchema = require("../../models/academics/batches");


const getBatch = async (req, res) => {
    try {
        const { status, name, limit = 10, page } = req.query
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit)
        const skip = (pageNumber - 1) * limitNumber || 0
        const match = {}
        if (status) {
            match.status = {
                $regex: status,
                $options: "i"
            }
        }
        if (name) {
            match.batchName = { $regex: name, $options: 'i' }
        }

        const data = await batcheSchema.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "courses",
                    foreignField: "_id",
                    localField: "courseId",
                    as: "batchData"

                },
            },
            { $skip: skip },
            { $limit: limitNumber },
            {
                $unwind: {
                    path: "$batchData",
                    preserveNullAndEmptyArrays: true
                }

            }


        ])
        res.status(200).json({ status: true, message: "success", data });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", err: error.message });

    }
}

const addBatch = async (req, res) => {
    try {
        const { batchName, courseId, start, end } = req.body;
        if (!batchName || !courseId || !start || !end) {
            return res.status(400).json({ status: false, message: "all are field required" });
        }
        const data = await new batcheSchema({ batchName, courseId, start, end });
        data.save()
        res.status(201).json({ status: true, message: "batch add successfull", data });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", err: error.message })
    }
}

const updateBatch = async (req, res) => {
    if (!req?.params?.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ status: false, message: 'valid id  is required' });
    }
    try {
        const { id } = req.params;
        const { start, end } = req.body;
        if (!start || !end) {
            return res.status(400).json({ status: false, message: "start and end time is required" });
        }
        const check = await batcheSchema.findById(id);
        if (!check) {
            return res.status(400).json({ status: false, message: "batch not found" });
        }
        const data = await batcheSchema.findByIdAndUpdate(id, { start, end }, { new: true })
        res.status(200).json({ message: "batch update successfull", data })
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", err: error.message })
    }

}

const deActiveBatch = async (req, res) => {
    if (!req?.params?.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ status: false, message: 'valid id  is required' });
    }
    try {
        const { id } = req.params;
        const check = await batcheSchema.findById(id);
        if (!check) {
            return res.status(400).json({ status: false, message: "batch not found" });
        }
        const data = await batcheSchema.findByIdAndUpdate(id, { status: 'inActive' }, { new: true });
        res.status(200).json({ status: true, message: "batch deActive successfull", data });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", err: error.message })
    }

}

module.exports = { addBatch, updateBatch, deActiveBatch, getBatch };
