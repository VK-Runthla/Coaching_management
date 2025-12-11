const express = require("express")
const uploads = require("../utilities/multer")
const {addadmin} = require("../controllers/addadminController")
const adminRouter = express.Router()

adminRouter.post('/Add-admin',uploads.single('adminprofile'),addadmin)



module.exports = adminRouter