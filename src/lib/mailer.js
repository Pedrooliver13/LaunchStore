const nodemailer = require('nodemailer');

// pega no proprio site do mailer
module.exports = transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a63a7fb410d397",
    pass: "2164074ff92e2a"
  }
});