const { UNAUTHORIZED, MovieApiError } = require('./errors');

class UnauthorizedError extends MovieApiError {
  constructor(message) {
    const errMsg = `не авторизован: ${message}`;
    super(errMsg);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
