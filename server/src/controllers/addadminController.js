const mongoose = require("mongoose")
const AddadminSchma = require("../models/addadminSchma")
const bcrypt = require('bcrypt');

const addadmin = async (req, res) => {
    try {
        const { Name, Email, MobileNumber, Password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(Password, salt)
        const addadmin = await new AddadminSchma({ Name, Email, MobileNumber, password, Adminprofile: req.file.filename, })
        await addadmin.save()
        res.send({status:1,})
    } catch (error) {

    }
}

module.exports = { addadmin } ; 
