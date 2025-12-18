const mongoose = require("mongoose")
const AddadminSchma = require("../../models/adminauth/addadminSchma")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const validator = require('validator');
const sendmails = require("../../utilities/mailer");
const otpSchema = require("../../models/adminauth/otp_Schma")
const moment = require("moment")

const addadmin = async (req, res) => {
    try {
        const { name, email, mobileNumber, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        console.log(hashpassword)
        const addadmin = new AddadminSchma({ name, email, mobileNumber, password: hashpassword, Adminprofile: req.file?.filename, });
        await addadmin.save();
        return res.send({ status: 1, msg: "Admin added successfully", addadmin });
    } catch (error) {
        return res.send({ status: 0, msg: "error", error: error.message });
    }
};
const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) return res.send({ status: 0, msg: "registered Frist!" });

        const normalizedEmail = String(email).trim().toLowerCase();

        if (!normalizedEmail.includes('@')) {
            return res.send({ status: 0, msg: "invalid email format" });
        }

        if (!validator.isEmail(normalizedEmail)) {
            return res.send({ status: 0, msg: "invalid email format" });
        }

        const checkemail = await AddadminSchma.findOne({ email: normalizedEmail });
        if (!checkemail) {
            return res.send({ status: 0, msg: "registered Frist!" });
        }

        const checkPass = await bcrypt.compare(password, checkemail.password)
        if (!checkPass) {
            return res.send({ status: 0, msg: "invalid password please enter valid password " })
        }

        const addadmintoken = jwt.sign(
            { Name: checkemail.name, Email: checkemail.email, id: checkemail._id },
            "mukesh2122"
        );

        return res.send({ status: 1, msg: "admin login successfully", addadmintoken })

    } catch (error) {
        res.send({ status: 0, msg: "error", error: error.message })
    }
}
const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const checkemail = AddadminSchma.find({ email })
        if (!checkemail) {
            res.send({ status: 0, msg: "Email not registered !" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await sendmails("Rns <mukeshjat83024@gmail.com>", email, 'Your OTP Code', `<h1>Your OTP Code</h1><p>Your OTP code is: <strong>${otp}</strong></p>`); const expiry = moment().add(2, "minute").valueOf()
        await otpSchema.create({ email, otp, expiry })
        res.status(200).json({ status: true, message: 'OTP sent successfully', otp });
    } catch (error) {
        res.send({ status: 0, msg: "Failed to send OTP", error: error.message })
    }
}
const verifyOTP = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const checkotp = await otpSchema.findOne({ email })
        if (otp !== checkotp.otp) {
            res.send({ status: 0, msg: "Invalid otp!" })
            console.log(checkotp)
        }
        res.send({ status: 1, msg: "verify successfully" })
        await otpSchema.findByIdAndDelete(checkotp._id)
    } catch (error) {
        res.send({ status: 0, mag: "error", error: error.message })
    }
}
const updatepassword = async (req, res) => {
    const {email,newPassword} = req.body;
    try {
    const checkemail = await AddadminSchma.find({email})
    const updatepassword = await AddadminSchma.findByIdAndUpdate(checkemail._id,{Password:newPassword},{new:true})
    res.send({status:1,msg:"admin password is updated "})
    } catch (error) {
    res.send({status:0,msg:"error",error:error.message})
    }
}


module.exports = { addadmin, adminlogin, forgotpassword, verifyOTP,updatepassword }
