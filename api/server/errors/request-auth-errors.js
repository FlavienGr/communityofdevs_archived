const CustomErrors = require('./customErrors');

class RequestAuthErrors extends CustomErrors {
  constructor() {
    super();
    this.message = 'Authentification failed, try again';
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
module.exports = RequestAuthErrors;