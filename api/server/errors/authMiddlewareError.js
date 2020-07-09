const CustomErrors = require('./customErrors');

class AuthMiddlewareError extends CustomErrors {
  constructor() {
    super();
    this.message = 'Authentication failed, please go back to signug page';
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
module.exports = AuthMiddlewareError;
