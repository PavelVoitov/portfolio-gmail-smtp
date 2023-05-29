const express = require('express')
const nodemailer = require("nodemailer")
const cors = require("cors")
const bodyParser = require('body-parser')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = process.env.PORT || 3020
const smtp_login = process.env.SMTP_LOGIN
const smtp_password = process.env.SMTP_PASSWORD

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login, // user's email
        pass: smtp_password, // password
    },
})

app.post('/sendMessage', async (req, res) => {

    const {name, email, message} = req.body

    //send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'MESSAGE FROM PORTFOLIO', // sender address
        to: smtp_login, // list of receivers
        subject: "Offer", // Subject line
        html: `<h1>MESSAGE FROM PORTFOLIO</h1>
                <div>
                    <b>Name:</b> ${name}
                </div>
                <div>
                    <b>Email:</b> ${email}
                </div>
                <div>
                    <b>Message:</b> ${message}
                </div>`, // html body
    });

    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})