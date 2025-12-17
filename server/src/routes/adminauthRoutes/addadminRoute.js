const express = require("express")
const uploads = require("../../utilities/multer")
const {addadmin,adminlogin,forgotpassword,verifyOTP,updatepassword} = require("../../controllers/admincontrollers/addadminController")
const adminRouter = express.Router()

adminRouter.post('/Add-admin',uploads.single('Adminprofile'),addadmin)
adminRouter.post('/login-admin',adminlogin)
adminRouter.post('/forgot-password',forgotpassword)
adminRouter.post('/verify-OTP',verifyOTP)
adminRouter.post('/update-password',updatepassword)



module.exports = adminRouter