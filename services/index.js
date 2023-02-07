module.exports = {
  oauthService: require('./OAuth.service'),
  emailService: require('./email.service'),
  fileS3Service: require('./fileS3.service'),
};

//with unclear separation of files, can form a cyclic dependency
