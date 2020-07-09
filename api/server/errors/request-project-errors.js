const CustomErrors = require('./customErrors');

class RequestProjectErrors extends CustomErrors {
  constructor(message, code) {
    super();
    this.message =
      message ||
      'This project name is already taken, please choose another name';
    this.statusCode = code || 403;
  }

  serializeError() {
    return [
      {
        message: this.message
      }
    ];
  }
}
module.exports = RequestProjectErrors;
