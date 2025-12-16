const express=require("express")
const { addsession, getsession, updatesession, deletesession } = require("../controllers/sessionApis")

const sessionrout=express.Router()


sessionrout.post("/add",addsession)
sessionrout.get("/get",getsession)
sessionrout.put("/update/:id",updatesession)
sessionrout.delete("/delete/:id",deletesession)


module.exports=sessionrout