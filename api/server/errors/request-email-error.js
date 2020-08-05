const CustomErrors = require('./customErrors');

class RequestEmailErrors extends CustomErrors {
  constructor(message, code) {
    super();
    this.message =
      message ||
      'An error happened during the process, please send another email or try later';
    this.statusCode = code || 500;
  }

  serializeError() {
    return [
      {
        message: this.message
      }
    ];
  }
}
module.exports = RequestEmailErrors;
