const mongoose = require('mongoose');
const notification = require('../../models/Advertisement/notifications');


const sentNotification = async (req, res) => {
    const { status } = req.body;
    if (status == "Public") {
        const { title, description, notificationDate } = req.body;
        if (!title || !description || !notificationDate) {
            return res.status(400).json({ status: false, message: "All Feilds are reqired ! " });
        }
        const sendPublic = await notification({ title, description, notificationDate });
        await sendPublic.save();
        return res.status(200).json({ status: true, sendPublic })
    } else {
        const { title, description, notificationDate, course, batch } = req.body;
        if (!title || !description || !notificationDate || !course || !batch) {
            return res.status(400).json({ status: false, message: "All Feilds are reqired ! " });
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

module.exports = { sentNotification }