const nodemailer = require("nodemailer");
const { smtpConfig } = require("../config/config");
class EmaliService {

    //server connect
    #transport;
    constructor() {
        try {
            let config = {
                host: smtpConfig.host,
                port: smtpConfig.port,
                service: smtpConfig.provider,
                auth: {
                    user: smtpConfig.user,
                    pass: smtpConfig.password,
                }
            }
            if (smtpConfig.provider === 'gmail') {
                config = {
                    ...config,
                    service: smtpConfig.provider,
                }
            }
            this.#transport = nodemailer.createTransport(config)
        } catch (exception) {
            console.log("****Error connecting email server ****")
            throw exception

        }
    }

    sendEmail = async ({ to, subject, message, cc = null, bcc = null, attachments = null }) => {
        try {
            let body = {
                to: to,
                from: smtpConfig.from,
                subject: subject,
                html: message
            }
            if (cc) {
                body.cc = cc
            }
            if (bcc) {
                body.bcc = bcc
            }
            if (attachments) {
                body.attachments = attachments
            }
            let result = await this.#transport.sendMail(body)
            return result
        } catch (exception) {
            console.error("EMAIL ERROR:", exception);
            throw {
                message: "Unable to send email",
                status: 500,
                data: null,
                errorDetails: exception.message || exception
            };
        }
    }
}
const emailSvc = new EmaliService()
module.exports = emailSvc