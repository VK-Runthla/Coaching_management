// This is DB.js 
require("dotenv").config()
const mongoose = require ("mongoose")

const connectedDatabase = async (req,res)=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database is connected successfully")
    } catch (error) {
        res.send({status : 0,msg:"error",error})
    }
}
module.exports = connectedDatabase