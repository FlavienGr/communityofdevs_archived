const CustomErrors = require('./customErrors');

class RequestProjectErrors extends CustomErrors {
  constructor() {
    super();
    this.message =
      'This project name is already taken, please choose another name';
    this.statusCode = 403;
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
