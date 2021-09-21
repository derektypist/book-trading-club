const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

// Book Schema
const BookSchema = new Schema({
  title: {type: String},
  description: {type: String},
  author: {type: String},
  category: {type: String},
  bookid: {type: String},
  owner: {type: Schema.Types.ObjectId, ref:'User'},
  status: {type: String,
    enum: ['available','pending'],
    default: 'available'}
});

const Book = mongoose.model("book",BookSchema);

// User Schema
const UserSchema = new Schema({
  local: {username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  addedbooks: [{type: Schema.Types.ObjectId, ref: 'Book'}],
  city: {type: String}},
  county: {type: String},
  country: {type: String}
});

// Apply hashing password
let saltRounds = 10;
let salt = bcrypt.genSaltSync(saltRounds);
UserSchema.methods.genHash = (password) => {
  return bcrypt.hashSync(password, salt);
};

// Compare input password with database password
UserSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model("user",UserSchema);

// Trade Schema
const TradeSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book'
  },
  status: {
    type: String,
    enum: ['pending','approved','rejected'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Trade = mongoose.model("trade",TradeSchema);

// Export Modules
exports.Book = Book;
exports.User = User;
exports.Trade = Trade;