const multer = require('multer');

const MulterErrorFile = require('../errors/multerErrorFile');

const upload = multer({
  dest: 'temp/',
  limits: {
    fileSize: 200000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new MulterErrorFile());
    }
    cb(null, true);
  }
}).single('description');

const uploadDescriptionPdf = function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      return next(new MulterErrorFile(err.message));
    }
    next();
  });
};
module.exports = uploadDescriptionPdf;
