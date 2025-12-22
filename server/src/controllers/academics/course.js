const mongoose = require('mongoose');
const course = require('../../models/academics/course');


const getCourse = async (req, res) => {
    try {
        const { courseName, courseType, duration, status, limit = 10, page = 1 } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const match = {};
        if (status) {
            match.status = status;
        }
        if (courseType) {
            match.courseType = courseType;
        }
        if (duration) {
            match.duration = duration
        };
        if (courseName) {
            match.courseName = courseName;
        }
        const data = await course.aggregate([
            { $match: match },
            {
                $lookup: {
                    from: "batches",
                    localField: "batch_Id",
                    foreignField: "_id",
                    as: "batchDetails"
                }
            },
            {
                $unwind: "$batchDetails"
            },
            { $skip: skip },
            { $limit: limitNumber }
        ]);
        if(data.length == 0){
            return res.status(200).json({status : true , message : "Data is not avlable !"})
        }

        res.status(200).json({ status: true, message: "success", page: pageNumber, limit: limitNumber, data });

    } catch (error) {
        console.log("server error : ", error)
        return res.status(500).json({ status: false, message: "server error", error: error.message });
    }
};


const addCourse = async (req, res) => {
    try {
        const { courseName, courseType, duration, coursePrice, discountPrice, status } = req.body;
        if (!courseName || !courseType || !duration || !coursePrice || !discountPrice || !status) {
            return res.status(400).json({ status: false, message: "All Field's are required" });
        }
        const addData = await course({ courseName, courseType, duration, coursePrice, discountPrice, status });
        await addData.save();
        res.status(200).json({ status: true, addData })
    } catch (err) {
        console.log("server error : ", err);
        return res.status(500).json({ status: false, message: "server error" })
    }
}

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { courseName } = req.body;
        if (!courseName) {
            return res.status(400).status({ status: false, message: "please enter the course name !" })
        }
        const check = await course.findById(id)
        if (!check) {
            return res.status(400).json({ status: false, message: "Invalid Id !" })
        }
        const update = await course.findByIdAndUpdate(id, { courseName }, { new: true });
        res.status(200).json({ status: true, message: "Course updated Successfully !", update })
    } catch (err) {
        console.log("server error : ", err);
        return res.status(500).json({ status: false, message: "server error !" })
    }
}

const deactiveCourse = async (req, res) => {
    const { id } = req.query;
    const { status } = req.body;
    const check = await course.findById(id);
    if (!check) {
        return res.status(400).json({ status: false, message: "Invalid Id !" })
    }
    let statusCheck = check.status = status;
    const updateStatus = await course.findByIdAndUpdate(id, { status: statusCheck }, { new: true })
    await updateStatus.save()
    if (updateStatus.status == "Active") {
        return res.status(200).json({ status: true, message: "active", status: updateStatus.status })
    } else {
        return res.status(200).json({ status: true, message: "inactive", status: updateStatus.status })
    }

}


module.exports = { getCourse, addCourse, updateCourse, deactiveCourse }