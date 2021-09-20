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

const Books = mongoose.model("Books",BooksSchema);

// User Schema
const UsersSchema = new Schema({
  name: {type: String},
  city: {type: String},
  county: {type: String},
  country: {type: String}
})