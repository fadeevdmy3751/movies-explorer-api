const { FORBIDDEN, MovieApiError } = require('./errors');

class ForbiddenError extends MovieApiError {
  constructor(message) {
    const errMsg = `доступ запрещен: ${message}`;
    super(errMsg);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ForbiddenError;
