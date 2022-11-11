require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const DefaultError = require('../errors/DefaultError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { DevJwtKey } = require('../utils/config');
const UnauthorizedError = require("../errors/UnauthorizedError");

function getMe(req, res, next) {
  userModel.findOne({ _id: req.user._id })
    .then((user) => {
      if (user) res.send(user);
      else next(new NotFoundError('пользователь'));
    })
    .catch((/* err */) => {
      // if (err.name === 'CastError') next(new IncorrectDataError('ID пользователя'));
      // else // невозможная ситуация ибо id ставится внутри
      next(new DefaultError('Произошла ошибка при получении пользователя'));
    });
}
function updateProfile(req, res, next) {
  const { name = null, email = null } = req.body;
  userModel.find({movieId:{$ne:"8"},email:email}).
    .then(user => {
      if(user) return Promise.reject(new ConflictError('пользователь с такой почтой уже существует'));
      userModel.findByIdAndUpdate
//todo HEREERERERE
    })
  })
  // userModel.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
  //   .then((user) => res.send(user))
  //   .catch((err) => {
  //     if (err.name === 'ValidationError') next(new IncorrectDataError('профиль'));
  //     else next(new DefaultError('Произошла ошибка при обновлении профиля'));
  //   });
}
function createUser(req, res, next) {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, email, password: hash,
    }))
    .then((newUser) => {
      const toSend = { ...newUser.toJSON() };
      delete toSend.password;
      res.send(toSend);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new IncorrectDataError('почта/пароль'));
      else if (err.code === 11000) next(new ConflictError('пользователь с такой почтой уже существует'));
      else next(new DefaultError('Произошла ошибка при создании пользователя'));
    });
}
function login(req, res, next) {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DevJwtKey,
        { expiresIn: '7d' },
      );
      // вернём токен
      res.cookie('jwt', token, {
      // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true, // только для https
        sameSite: 'none',
      })
        .send({
          message: 'успешная авторизация',
        });
    })
    .catch(next);
}

function logout(req, res) {
  // Set token to none and expire after 5 seconds
  res.cookie('jwt', 'none', {
    maxAge: 5,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
    .send({
      message: 'вы разлогинены успешно',
    });
}

module.exports = {
  login, createUser, logout, updateProfile, getMe,
};
