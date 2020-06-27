const CustomErrors = require('./customErrors');

class RequestInsertErrors extends CustomErrors {
  constructor() {
    super();
    this.message = 'Data not allowed';
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
module.exports = RequestInsertErrors;
