const CustomErrors = require('./customErrors');

class RequestAuthErrors extends CustomErrors {
  constructor(message, code) {
    super();
    this.message = message || 'Authentification failed, try again';
    this.statusCode = code || 400;
  }

  serializeError() {
    return [
      {
        message: this.message
      }
    ];
  }
}
module.exports = RequestAuthErrors;
