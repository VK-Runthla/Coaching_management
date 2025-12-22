const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    status: {
        
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    notificationDate: {
        type: String,
        required: true
    }
})
const notification = mongoose.model("notifications", notificationSchema);
module.exports = notification;