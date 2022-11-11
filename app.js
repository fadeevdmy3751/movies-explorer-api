const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter, DBUrl } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mainRouter = require('./routes');
const ErrorHandler = require('./errors/ErrorHandler');

const app = express();
const { PORT = 3100 } = process.env;

mongoose.connect(DBUrl);

app.use(requestLogger); // логгер запросов
app.use(limiter);
app.use(cors({
  // todo актуализировать
  origin: ['http://localhost:3100', 'http://localho.st:3100', 'http://fdmitrij.nomoredomains.icu', 'https://fdmitrij.nomoredomains.icu'],
  credentials: true,
}));

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(cookieParser()); // парсер кук
app.use(helmet());

// путь /api/ согласно странному пункту чеклиста в разделе Хорошие практики:
// API приложения располагается на домене вида: name.zone/api, а не просто name.zone.
// таким образом обращения по урлу апи но без путя /api будут вести на 404 ошибку nginx
app.use('/api/', mainRouter);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(ErrorHandler);

app.listen(
  PORT,
  () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    // запрещено линтером, поэтому
    /* esl int-dis able no-console */
    // console.log(`App listening on port ${PORT}`);
    /* esl int-ena ble no-console */
  },
);
