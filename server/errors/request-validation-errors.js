class RequestValidationErrors extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
    this.statusCode = 400;
  }

  serializeError() {
    const formatedErrors = this.errors.map(error => {
      return { message: error.msg, field: error.param };
    });
    return formatedErrors;
  }
}
module.exports = RequestValidationErrors;
