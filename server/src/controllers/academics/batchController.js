const batcheSchema = require("../../models/academics/batches");


const getBatch = async (req, res) => {
    try {
        const { status, name, limit = 10, page } = req.query
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit)
        const skip = (pageNumber - 1) * limitNumber ||0
        const match = {}
        if (status) {
            match.status = status
        }
        if (name) {
            match.name = name
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
                    as: "newData"

                },
            },
            { $skip: skip },
           { $limit: limitNumber },
         
         
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
    try {
        const { id } = req.params;
        const { start, end } = req.body;
        const check = await batcheSchema.findById(id);
        if (!check) {
            return res.status(400).json({ status: false, message: "batch not found" });
        }
        const data = batcheSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ message: "batch update successfull", data })
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", err: error.message })
    }

}


const deleteBatch = async (req, res) => {
    try {
        const { id } = req.params;
        const check = await batcheSchema.findById(id);
        if (!check) {
            return res.status(400).json({ status: false, message: "batch not found" });
        }
        const data = await batcheSchema.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "batch delete successfull", data });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", err: error.message })


    }

}


module.exports = { addBatch, updateBatch, deleteBatch, getBatch };
