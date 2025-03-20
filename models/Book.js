const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Book', bookSchema);
