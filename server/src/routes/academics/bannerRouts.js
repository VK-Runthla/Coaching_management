const express=require("express")
const upload = require("../../utilities/multer")
const { addbanner } = require("../../controllers/academics/bannerApi")
const bannerrout=express.Router()

bannerrout.post("/addbanner",upload.single("photo"),addbanner)

module.exports=bannerrout

