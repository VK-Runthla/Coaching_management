const express = require('express');
const { sentNotification, deleteNotification, getCourseBatches } = require('../../controllers/Advertisement/notifications');

const notificationRouter = express.Router();

notificationRouter.post('/notificationSend', sentNotification)
notificationRouter.delete('/notificationDelete', deleteNotification)
notificationRouter.get('/getCourseBatches', getCourseBatches)


module.exports = notificationRouter