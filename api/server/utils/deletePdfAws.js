const s3 = require('../db/AWS');
const RequestPdfErrors = require('../errors/request-pdf-errors');

module.exports = async data => {
  const myBucket = process.env.S3_BUCKET_NAME;
  const file = data;
  const params = {
    Bucket: myBucket,
    Key: file
  };

  try {
    const pdf = await s3.deleteObject(params).promise();

    if (!pdf) {
      throw new RequestPdfErrors();
    }
    return pdf;
  } catch (error) {
    throw new RequestPdfErrors();
  }
};
