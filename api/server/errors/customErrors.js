class CustomErrors extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }

  serializeError() {
    return [
      {
        message: this.errors
      }
    ];
  }
}
module.exports = CustomErrors;
