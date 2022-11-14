const { DEFAULT_ERROR, MovieApiError } = require('./errors');

class DefaultError extends MovieApiError {
  constructor(message) {
    const errMsg = `ошибка сервера: ${message}`;
    super(errMsg);
    this.statusCode = DEFAULT_ERROR;
  }
}

module.exports = DefaultError;
