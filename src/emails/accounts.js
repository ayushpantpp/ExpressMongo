const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SendGridApiKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'ayushpantpp@gmail.com',
        subject:'Welcome to app',
        text: `Welcome to the app ${name}, how do you feel`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'ayushpantpp@gmail.com',
        subject:'Take care',
        text: `Good bye ${name}, we will miss you !!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail

}