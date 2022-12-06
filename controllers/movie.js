const movieModel = require('../models/movie');
const DefaultError = require('../errors/DefaultError');
const NotFoundError = require('../errors/NotFoundError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const ConflictError = require('../errors/ConflictError');
const ForbiddenError = require('../errors/ForbiddenError');

function getMovies(req, res, next) {
  movieModel.find({ owner: req.user._id }, null, { sort: { _id: -1 } })
    .then((movies) => res.send(movies))
    .catch(() => next(new DefaultError('Произошла ошибка при получении списка фильмов')));
}

function deleteMovie(req, res, next) {
  movieModel.findById(req.params.movieId)
    .orFail(new NotFoundError('фильм'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('чужой фильм');
      }
      movie.delete()
        .then(() => res.send({ message: 'фильм удалён из избранного' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new IncorrectDataError('ID фильма'));
      else next(err);
    });
}

// old way
// function deleteMovie(req, res, next) {
//   movieModel.findOne({ movieId: req.params.movieId, owner: req.user._id })
//     .then((movie) => {
//       if (!movie) next(new NotFoundError('фильм'));
//       else {
//         movieModel.findByIdAndDelete(movie._id)
//           .then(() => res.send({ message: 'фильм удалён из избранного' }))
//           .catch(next);
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') next(new IncorrectDataError('ID фильма'));
//       else next(err);
//     });
// }

function createMovie(req, res, next) {
  const { body } = req;
  movieModel.findOne({ movieId: body.movieId, owner: req.user._id })
    .then((movie) => {
      if (movie) {
        next(new ConflictError('такой фильм для данного пользователя уже добавлен'));
        return;
      } // already liked
      movieModel.create({ ...body, owner: req.user._id })
        .then((newMovie) => res.send({ message: `фильм ${newMovie._id} добавлен` }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new IncorrectDataError(`параметры фильма: ${Object.keys(err.errors).join()}`));
          } else next(new DefaultError(`добавление фильма: ${err.message}`));
        });
    });
}

module.exports = { getMovies, createMovie, deleteMovie };
