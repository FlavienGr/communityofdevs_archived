const CustomErrors = require('./customErrors');

class DatabaseConnectionError extends CustomErrors {
  constructor() {
    super();
    this.message = 'Database connection error';
    this.statusCode = 500;
  }

  serializeError() {
    return [
      {
        message: this.message
      }
    ];
  }
}
module.exports = DatabaseConnectionError;
