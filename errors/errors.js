const INCORRECT_DATA = 400;
const UNAUTHORIZED = 401; // — передан неверный логин или пароль.
const FORBIDDEN = 403; // — попытка удалить чужую карточку;
const NOT_FOUND = 404;
// Также эту ошибку возвращает авторизационный middleware, если передан неверный JWT;
const CONFLICT = 409; // при регистрации указан email, который уже существует на сервере
const DEFAULT_ERROR = 500;

class MovieApiError extends Error {
  constructor(message) {
    super(message);
    this.message = `Movie error: ${this.message}`;
  }
}

module.exports = {
  MovieApiError,
  INCORRECT_DATA,
  NOT_FOUND,
  DEFAULT_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
};
