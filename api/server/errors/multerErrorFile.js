const CustomErrors = require('./customErrors');

class MulterErrorFile extends CustomErrors {
  constructor(message) {
    super();
    this.message = message || 'Only PDF file is allowed';
    this.statusCode = 400;
  }

  serializeError() {
    return [
      {
        message: this.message
      }
    ];
  }
}
module.exports = MulterErrorFile;
