const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');

const config = require('../configs/config');

const sendMail = (recipientEmail) => {
  const templateParser = new EmailTemplate({
    // views: {
    //   root:
    // }
  });

  const transporter = nodemailer.createTransport({
    // FOR NOT @gmail.com
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      user: config.NO_REPLY_EMAIL, // generated ethereal user
      pass: config.NO_REPLY_EMAIL_PASSWORD, // generated ethereal password
    },
  });

  return transporter.sendMail({
    from: 'No reply',
    to: recipientEmail,
    subject: 'TEST',
    html: '<h1> TEST EMAIL </h1>'
  });
};

module.exports = {
  sendMail,
};
