const mongoose = require('mongoose');
const notification = require('../../models/advertisement/notifications');
const course = require('../../models/academics/course');

const getCourseBatches = async (req, res) => {
    try {
        const { courseName } = req.query;
        const match = {};
        if (courseName) {
            match.courseName = courseName;
        }
        const data = await course.aggregate([
            { $match: match },
            {
                $lookup: {
                    from: "batches",
                    localField: "_id",
                    foreignField: "courseId",
                    as: "courseBatch"
                }
            },
            {
                $unwind: "$courseBatch"
            },
        ]);
        if (data.length == 0) {
            return res.status(200).json({ status: true, message: "Data is not avlable !" })
        }
        res.status(200).json({ status: true, message: "successfully getting",data });
    } catch (error) {
        console.log("server error : ", error)
        return res.status(500).json({ status: false, message: "server error", error: error.message });
    }
};


const sentNotification = async (req, res) => {
    const { status } = req.body;


    
    if (!status) {
        return res.status(400).json({ status: false, message: "Status is required !" })
    }
    if (status == "Public") {
        const { title, description, notificationDate } = req.body;
        if (!title || !description || !notificationDate) {
            return res.status(400).json({ status: false, message: "All Feilds are reqired for public section ! " });
        }
        const sendPublic = await notification({ title, description, notificationDate });
        await sendPublic.save();
        return res.status(200).json({ status: true, sendPublic })
    } else {
        const { title, description, notificationDate, course, batch } = req.body;
        if (!title || !description || !notificationDate || !course || !batch) {
            return res.status(400).json({ status: false, message: "All Feilds are reqired for private ! " });
        }
        const sendPrivate = await notification({ title, description, notificationDate, course, batch });
        await sendPrivate.save();
        return res.status(200).json({ status: true, sendPrivate })
    }
}

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const check = await notification.findById(id);
        if (!check) {
            return res.status(400).json({ status: false, message: "notification is not found" });
        }
        const data = await notification.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "Delete Successfully !" })
    } catch (error) {
        console.log("server error : ", error);
        return res.status(500).json({ status: false, message: "server error " })
    }
}

module.exports = { getCourseBatches, sentNotification, deleteNotification }