const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photostreamModel = new Schema({
  title: { type: String, required: false },
  link: { type: String, required: false },
  media: { type: { m: String }, required: false },
  data_taken: { type: String, required: false },
  description: { type: String, required: true },
  published: { type: String, required: true },
  author: { type: String, required: true },
  author_id: { type: String, required: true },
  tags: { type: String, required: false }
});

module.exports = mongoose.model('photostream', photostreamModel);