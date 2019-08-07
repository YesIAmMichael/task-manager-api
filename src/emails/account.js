const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'michaelshanewilliams@gmail.com',
        subject: 'Welcome to Task App!',
        text: `Welcome to the app, ${name}. Let me know how you like the app.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'michaelshanewilliams@gmail.com',
        subject: `So long, ${name}.`,
        text: `My dearest ${name}: We are so sorry to see you go.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}