const nodemailer = require("nodemailer");
const { Configs } = require("./config");

const mail = nodemailer.createTransport({
    host: Configs.MAIL_HOST,
    port: Configs.MAIL_PORT,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: Configs.MAIL_USERNAME,
        pass: Configs.MAIL_PASSWORD,
    },
});

const sendMail = async ({
    to, subject, text
}) => {
    try {
        const info = await mail.sendMail({
            from: '"IMS" <contact@harshadsatasiya.com>', // sender address
            to, // list of receivers
            subject, // Subject line
            text
        });
        console.log("Message", info);

        return info;
    } catch (err) {
        console.log(err)
        return Promise.reject(err);
    }
}

module.exports = { mail, sendMail }