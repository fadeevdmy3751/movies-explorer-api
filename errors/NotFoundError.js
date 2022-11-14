const { NOT_FOUND, MovieApiError } = require('./errors');

class NotFoundError extends MovieApiError {
  constructor(message) {
    const errMsg = `объект не найден: ${message}`;
    super(errMsg);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundError;
