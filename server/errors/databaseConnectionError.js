class DatabaseConnectionError extends Error {
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
