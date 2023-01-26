const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('node:path');

const config = require('../configs/config');
const templatesInfo = require('../emailTemplates');
const { ServerError } = require('../errors/ApiError');

const sendMail = async (recipientEmail, emailType, locals = {}) => {
  // default value works only with undefined, doesn't work with null
  const templateParser = new EmailTemplate({
    views: {
      root: path.join(global.rootPath, 'emailTemplates')
    },
  });

  const templateConfig =templatesInfo[emailType];

  if (!templateConfig) {
    throw new ServerError('Wrong template name');
  }

  Object.assign(locals || {}, { URL: config.FRONTEND_URL });
  //  {} - undefined, null, ""

  const html = await templateParser.render(templateConfig.templateName, locals);

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
    subject: templateConfig.subject,
    html
  });
};

module.exports = {
  sendMail,
};
