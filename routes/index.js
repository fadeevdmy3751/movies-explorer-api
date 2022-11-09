// В app.js тогда будет только app.use('/', mainRoute);
// - тут вроде понятно, а в index.js тогда всё будет в одном файле, например,
// https://t.me/praktikum_45/36098*/
//     или можно*/
//   mainRouter.use('/users', usersRouter);*/
// mainRouter.use('/movies', moviesRouter); и импортировать в index.js уже эти роуты?
const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { validateNewUser, validateCredentials } = require('../middlewares/celebrations');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/user');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateCredentials, login);
router.post('/signup', validateNewUser, createUser);
router.use(auth);
router.post('/logout', logout);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
});
module.exports = router;
