const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mainRouter = require('./routes/index');
const ErrorHandler = require('./errors/ErrorHandler');

const app = express();
const { PORT = 3100 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviedb');

app.use(cors({
  // todo актуализировать
  origin: ['http://localhost:3100', 'http://localho.st:3100', 'http://fdmitrij.nomoredomains.icu', 'https://fdmitrij.nomoredomains.icu'],
  credentials: true,
}));

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(cookieParser()); // парсер кук
app.use(requestLogger); // логгер запросов

app.use('/', mainRouter);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(ErrorHandler);

app.listen(
  PORT,
  () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    // запрещено линтером, поэтому
    /* eslint-disable no-console */
    console.log(`App listening on port ${PORT}`);
    /* eslint-enable no-console */
  },
);
