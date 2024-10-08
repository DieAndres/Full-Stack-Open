const mongoose = require('mongoose');
require('dotenv').config();
const { info } = require('../utils/logger');
const { URL } = require('../utils/configs');
mongoose.set('strictQuery', false);

mongoose.connect(URL)
  .then(() => {
    info('connected to MongoDB');
  })
  .catch(error => {
    info('error connecting to MongoDB:', error.message);
  });
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 }
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);