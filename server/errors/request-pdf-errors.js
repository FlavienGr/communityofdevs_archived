const CustomErrors = require('./customErrors');

class RequestPdfErrors extends CustomErrors {
  constructor() {
    super();
    this.message = 'A problem occured, try to download the pdf again';
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
module.exports = RequestPdfErrors;
