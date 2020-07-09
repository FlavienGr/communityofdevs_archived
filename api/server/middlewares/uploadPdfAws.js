const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const s3 = require('../db/AWS');
const RequestPdfErrors = require('../errors/request-pdf-errors');
const deleteTempFile = require('../utils/deleteTempFile');

exports.uploadPdfAws = async (req, _res, next) => {
  const format = req.file.mimetype;
  const extension = req.file.mimetype.split('/')[1];
  const generatedId = uuidv4();
  const myBucket = process.env.S3_BUCKET_NAME;
  const key = `${req.user.id}/${generatedId}.${extension}`;
  const file = fs.createReadStream(req.file.path);

  const params = {
    ACL: 'public-read',
    Bucket: myBucket,
    Key: key,
    Body: file,
    ContentType: `${format}`
  };

  try {
    const pdf = await s3.upload(params).promise();

    if (!pdf) {
      deleteTempFile(req.file.path);
      return next(new RequestPdfErrors());
    }
    deleteTempFile(req.file.path);
    req.user.imageUrl = pdf.key;

    return next();
  } catch (error) {
    deleteTempFile(req.file.path);
    return next(new RequestPdfErrors());
  }
};
