const AWS_S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v4;
const path = require('node:path');

const config = require('../configs/config');

const S3 = new AWS_S3({
  region: config.S3_REGION,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY,
  signatureVersion: 'v4',
  apiVersion: '2006-03-01'
});

async function uploadFileToS3(file, itemId, itemType) {
  const Key = fileNameBuilder(file, itemId, itemType);

  await S3
    .upload({
      Bucket: config.S3_BUCKET,
      Body: file.data, // buffer data
      Key, // fileName
      ContentType: file.mimeType
    })
    .promise(); // without promise => function will be with callbacks

  return `/files/private?url=${Key}`;
  // return Key;      // more dynamically
}

function getFileFromS3(Key) {
  return S3.getSignedUrl('getObject', { Key, Bucket: config.S3_BUCKET, Expires: 5 * 60 }); // 5m
}

function getFileBufferFromS3(Key) {
  return S3.getObject({ Key, Bucket: config.S3_BUCKET }).promise(); // 5m
  //                           which file, from which bucket
}

function fileNameBuilder(file, itemId, itemType) {
  const extension = path.extname(file.name); // .jpg

  return `${itemType}/${itemId}/${uuid()}${extension}`;
}

module.exports = {
  uploadFileToS3,
  getFileFromS3,
  getFileBufferFromS3
};
