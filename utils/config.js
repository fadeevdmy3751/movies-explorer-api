const rateLimit = require('express-rate-limit');
require('dotenv').config();

const limiter = rateLimit({
  windowMs: 60 * 1000, // за 1 минуту
  max: 100, // максимум 100 запросов с одного IP
});

const { DBUrl = 'mongodb://localhost:27017/moviesdb' } = process.env;

const DevJwtKey = 'dev-key-69';

module.exports = {
  limiter,
  DBUrl,
  DevJwtKey,
};

// содержимое .env
// NODE_ENV=production
// JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// PORT=3100
// DBUrl=mongodb://localhost:27017/moviesdb
