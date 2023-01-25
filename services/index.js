module.exports = {
  oauthService: require('./OAuth.service'),
  emailService: require('./email.service'),
};

//with unclear separation of files, can form a cyclic dependency
