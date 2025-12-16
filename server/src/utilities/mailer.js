const mailer = require("nodemailer")
const transporter = mailer.createTransport(
    {service: 'gmail',},
    {auth: {user: 'mukeshjat83024@gmail.com',pass: 'iqifickdowtrkmkq'}}
)
const sendmails = async (from, to, subject, text) => {
    try {
        await transporter.sendMail({from: from,to: to,subject: subject,html: text})
        console.log("mail send ")
    } catch (error) {
    console.log("error")
    }
}
module.exports = sendmails