const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('node:path');

const config = require('../configs/config');
const templatesInfo = require('../emailTemplates');
const { ServerError } = require('../errors/ApiError');

const sendMail = (recipientEmail, emailType, context = {}) => {
  context = context || {};
  const templateConfig =templatesInfo[emailType];

  if (!templateConfig) {
    throw new ServerError('Wrong template name');
  }

  Object.assign(context, { frontendURL: config.FRONTEND_URL });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.NO_REPLY_EMAIL, // generated ethereal user
      pass: config.NO_REPLY_EMAIL_PASSWORD, // generated ethereal password
    },
  });

  const options = {
    extName: '.hbs',
    viewPath: path.join(global.rootPath, 'emailTemplates', 'views'),
    viewEngine: {
      defaultLayout: 'main',
      layoutsDir: path.join(global.rootPath, 'emailTemplates', 'layouts'),
      partialsDir: path.join(global.rootPath, 'emailTemplates', 'partials'),
      extname: '.hbs'
    }
  };

  transporter.use('compile', hbs(options));

  return transporter.sendMail({
    from: 'No reply',
    to: recipientEmail,
    subject: templateConfig.subject,
    template: templateConfig.templateName,
    context,
  });
};

module.exports = {
  sendMail,
};
