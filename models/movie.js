const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: { type: String, required: true },
  director: { type: String, required: true },
  duration: { type: Number, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    required: true,
    validate: { validator: isUrl, message: 'invalid poster URL!' },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: { validator: isUrl, message: 'invalid trailer URL!' },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: { validator: isUrl, message: 'invalid thumbnail URL!' },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: { type: Number, required: true },
  nameRU: { type: String, required: true },
  nameEN: { type: String, required: true },
  // всего 12 полей
});

module.exports = mongoose.model('movie', movieSchema);
