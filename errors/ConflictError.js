const { CONFLICT, MovieApiError } = require('./errors');

class ConflictError extends MovieApiError {
  constructor(message) {
    const errMsg = `конфликт: ${message}`;
    super(errMsg);
    this.statusCode = CONFLICT;
  }
}

module.exports = ConflictError;
