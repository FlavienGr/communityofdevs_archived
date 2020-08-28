const CustomErrors = require('./customErrors');

class NotAllowedToAccess extends CustomErrors {
  constructor() {
    super();
    this.message = 'Operation not allowed, please go back to login page';
    this.statusCode = 401;
  }

  serializeError() {
    return [
      {
        message: this.message
      }
    ];
  }
}
module.exports = NotAllowedToAccess;
