const { getFileFromS3, getFileBufferFromS3 } = require('../../services/fileS3.service');

const getPrivateFileFromS3 = (req, res, next) => {
  try {
    const filFromS3URL = getFileFromS3(req.query.url);

    res.json(filFromS3URL);
  } catch (e) {
    next(e);
  }
};

const getPrivateFileStreamFromS3 = async (req, res, next) => {
  try {
    const { Body, ContentType } = await getFileBufferFromS3(req.query.url); // but use a lot of RAM
    //     Buffer, mimetype (img, jpeg)

    res
      .contentType(ContentType)
      .send(Buffer.from(Body, 'binary'));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getPrivateFileFromS3,
  getPrivateFileStreamFromS3
};
