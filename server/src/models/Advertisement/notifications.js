const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["Public", "Private"]
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    notificationDate: {
        type: String
    },
    Course: {
        type: String
    },
    Batch: {
        type: String
    }
})
const notification = mongoose.model("notifications", notificationSchema);
module.exports = notification;