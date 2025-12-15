const express = require("express")
const uploads = require("../utilities/multer")
const { addsubjets, deletesubject } = require("../controllers/subjectcontroller")
const subjectRouter = express.Router()

subjectRouter.post('/Add-subject',uploads.single('studentprofile'), addsubjets)
subjectRouter.delete('/Delete-subject',uploads.single('studentprofile'), deletesubject)



module.exports = subjectRouter;