const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // за 1 минуту
  max: 100, // максимум 100 запросов с одного IP
});

const DBUrl = 'mongodb://localhost:27017/moviesdb';

const JwtKey = 'dev-key';

module.exports = {
  limiter,
  DBUrl,
  JwtKey,
};
