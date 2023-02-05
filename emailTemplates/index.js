const { WELCOME, BANNED, FORGOT_PASSWORD, CONFIRM_EMAIL } = require('../configs/enums/emailActionTypes.enum');

module.exports = {
  [WELCOME]: {
    templateName: 'welcome',
    subject: 'welcome'
  },
  [BANNED]: {
    templateName: 'banned',
    subject: 'Account was blocked'
  },
  [FORGOT_PASSWORD]: {
    templateName: 'forgotPassword',
    subject: 'Forgot password'
  },
  [CONFIRM_EMAIL]: {
    templateName: 'confirmEmail',
    subject: 'Confirm your email'
  },
};
