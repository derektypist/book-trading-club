const mongoose = require('mongoose');
const {Schema} = mongoose;

// Book Schema
const BooksSchema = new Schema({
  title: {type: String},
  description: {type: String},
  author: {type: String},
  category: {type: String},
  id: {type: String}
});

