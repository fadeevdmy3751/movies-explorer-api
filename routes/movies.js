// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies
//
// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer,
// # nameRU, nameEN и thumbnail, movieId
// POST /movies
//
// # удаляет сохранённый фильм по id
// DELETE /movies/_id

const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validateMovie, validateMovieID } = require('../middlewares/celebrations');

router.get('/', getMovies);
router.post('/', /* validateMovie, */ createMovie);
router.delete('/:movieId', validateMovieID, deleteMovie);

module.exports = router;
