const nodemailer = require('nodemailer')
const statusCode = require('http-status-codes')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: 'ftmp kxas njgx kqpu',
    }
})

const sendEmail = async (to, subject, email) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: email
        })
    } catch (e) {
        console.error(e)
    }
}

module.exports = sendEmail;