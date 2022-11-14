// require('dotenv').config();

// const { NODE_ENV } = process.env;
const ErrorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  // if (NODE_ENV !== 'production' && statusCode === 500) {
  //   console.log(message);
  // }
  res.status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = ErrorHandler;
