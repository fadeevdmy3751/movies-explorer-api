// # возвращает информацию о пользователе (email и имя)
// GET /users/me
//
// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me

const router = require('express').Router();
const { updateProfile, getMe } = require('../controllers/user');
const { validateProfile } = require('../middlewares/celebrations');

router.get('/me', getMe);
router.patch('/me', validateProfile, updateProfile);

module.exports = router;
