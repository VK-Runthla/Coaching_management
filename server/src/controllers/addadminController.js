const mongoose = require("mongoose")
const AddadminSchma = require("../models/adminauth/addadminSchma")
const bcrypt = require('bcrypt');

const addadmin = async (req, res) => {
    try {
        const { Name, Email, MobileNumber, Password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(Password, salt)
        const addadmin = await new AddadminSchma({ Name, Email, MobileNumber, password, Adminprofile: req.file.filename, })
        await addadmin.save()
        res.send({status:1,msg:"Admin added successfully",addadmin})
        res.send({status:1,})
    } catch (error) {
    res.send({status:0,msg:"error",error})
    }
}

module.exports = { addadmin } ; 
