const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    status: {
        type : String,
        enum : ["Public" , "Private"],
        required : true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    notificationDate: {
        type: String
    }
})
const notification = mongoose.model("notifications", notificationSchema);
module.exports = notification;