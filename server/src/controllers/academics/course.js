const mongoose = require('mongoose');
const course = require('../../models/academics/course');


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
    let statusCheck = check.status = status
    console.log(statusCheck)
    if (check.status == "Active") {
        return res.status(200).json({ status: true, message: "active", status: check.status })
    } else {
        return res.status(200).json({ status: true, message: "inactive", status: check.status })
    }

}


module.exports = { addCourse, updateCourse, deactiveCourse }