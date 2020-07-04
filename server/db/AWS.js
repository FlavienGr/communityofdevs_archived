const AWS = require('aws-sdk');

const { AWS_SECRET_KEY, AWS_ACCESS_KEY_ID, AWS_REGION } = process.env;

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_REGION
});

module.exports = s3;
