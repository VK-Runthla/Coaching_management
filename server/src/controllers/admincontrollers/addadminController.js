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
        const { adminName, email, mobileNumber, password } = req.body;
        const salt = await bcrypt.genSalt(10);

        const hashpassword = await bcrypt.hash(password, salt);
        const addadmin = new AddadminSchma({ adminName, email, mobileNumber, password: hashpassword, adminprofile: req.file?.filename });
        // console.log(addadmin, "<--- addadmin reeponser")
        const saveResponse = await addadmin.save();
        // console.log(saveResponse, " <---save response")
        return res.send({ status: 1, msg: "Admin added successfully", });
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
        if (!checkotp) {
            return res.status(400).json({ status: 0, message: "invalid email" })
        }
        if (otp !== checkotp.otp) {
            res.send({ status: 0, msg: "Invalid otp!" })
            console.log(checkotp)
        }
        const currentTime = moment().valueOf()
        if (currentTime > checkotp.expiry) {
            res.send({ status: 0, msg: "expire otp!" })

        }
        res.send({ status: 1, msg: "verify successfully" })
        await otpSchema.findByIdAndDelete(checkotp._id)
    } catch (error) {
        res.send({ status: 0, mag: "error", error: error.message })
    }
}
const updatepassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const checkemail = await AddadminSchma.findOne({ email })
        if (!checkemail) {
            return res.status(400).json({ status: 0, message: "email not found" })
        }
        const updatepassword = await AddadminSchma.findByIdAndUpdate(checkemail._id, { Password: newPassword }, { new: true })
        res.send({ status: 1, msg: "admin password is updated " })
    } catch (error) {
        res.send({ status: 0, msg: "error", error: error.message })
    }
}

const resetadminpassword = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;
        const checkemail = AddadminSchma.findOne({ email });
        if (!checkemail) {
            res.send({ status: false, msg: "please enter valid email" })
        }
        const verifypass = bcrypt.compare(password, checkemail.password)
        if (!verifypass) {
            res.send({ status: false, msg: "invalid password!" })
        }
        const updatedPass = AddadminSchma.findByIdAndUpdate(checkemail._id, { password: newPassword }, { new: true })
        res.send({ status: true, msg: "password updated successfully" })
    } catch (error) {
        res.send({ status: false, msg: "errror", error: error.message })
    }
}

const updateAdminprofile = async (req, res) => {
    try {
        const { newName, email, newMobileNumber } = req.body;

        const checkemail = await AddadminSchma.findOne({ email });
        if (!checkemail) {
            return res.send({ status: false, msg: "Invalid email!" });
        }

        let updateData = {
            adminName: newName,
            mobileNumber: newMobileNumber
        };
        console.log(req.body.newName)

        if (req.file) {
            updateData.Adminprofile = req.file.filename;
        }

        const updatedProfile = await AddadminSchma.findByIdAndUpdate(checkemail._id, updateData, { new: true });

        res.send({ status: true, msg: "Admin profile updated successfully", data: updatedProfile });

    } catch (error) {
        res.send({ status: false, msg: "Error while updating profile", error: error.message });
    }
};



module.exports = { addadmin, adminlogin, forgotpassword, verifyOTP, updatepassword, resetadminpassword, updateAdminprofile }
