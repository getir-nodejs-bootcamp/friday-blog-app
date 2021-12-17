const eventEmitter = require('./eventEmitter');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

module.exports = () => {
    eventEmitter.on('send_email', async (emailData) => {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail(
            {
                from: process.env.EMAIL_FROM, // sender address
                ...emailData,
            },
            (err, info) => {
                console.log(info.envelope);
                console.log(info.messageId);
                console.log(err);
            }
        );
    });

    eventEmitter.on('send_sms', async (smsData) => {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const client = new twilio(accountSid, authToken);

        client.messages
            .create({
                ...smsData,
                from: process.env.TWILIO_SMS_FROM,
            })
            .then((message) => {
                console.log(`message sid: ${message.sid}`);
                console.log(`body: ${message.body}`);
                console.log(`errorCode: ${message.errorCode}`);
                console.log(`errorMessage: ${message.errorMessage}`);
            });
    });
};
