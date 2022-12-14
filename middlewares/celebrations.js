const { celebrate, Joi } = require('celebrate');

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const validateCredentials = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(), // еще посмотреть тип данных
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri({ domain: { minDomainSegments: 2 } }),
    trailerLink: Joi.string().required().uri({ domain: { minDomainSegments: 2 } }),
    thumbnail: Joi.string().required().uri({ domain: { minDomainSegments: 2 } }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieID = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  validateNewUser,
  validateCredentials,
  validateMovieID,
  validateMovie,
  validateProfile,
};
