const AWS_S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v4;
// const { nanoid } = require('nanoid');
const path = require('node:path');

const config = require('../configs/config');

const S3 = new AWS_S3({
  region: config.S3_REGION,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY,
  signatureVersion: 'v4',
  apiVersion: '2006-03-01'
});

function uploadFileToS3(file, itemId, itemType) {
  const Key = fileNameBuilder(file, itemId, itemType);

  return S3
    .upload({
      Bucket: config.S3_BUCKET,
      Body: file.data, // buffer data
      // Key: `'images/${file.name}`, // fileName
      Key, // fileName
      ACL: 'public-read',
      ContentType: file.mimeType
    })
    .promise(); // without promise => function will be with callbacks
}
function fileNameBuilder(file, itemId, itemType) {
  // const extension = file.name.trim('.').pop() // jpg
  const extension = path.extname(file.name); // .jpg

  return `${itemType}/${itemId}/${uuid()}${extension}`;
  // return `${itemType}/${itemId}/${nanoid(4)}${extension}`;
}

module.exports = {
  uploadFileToS3
};
