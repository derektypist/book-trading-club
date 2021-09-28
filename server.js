const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const url = require('./config/db.js').url;
mongoose.connect(url);
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const books = require('google-books-search');
const app = express();

// Set Up Template Engine
app.set('view engine','pug');

app.set('views','./views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req,res,next) {
  res.locals.user = req.user();
  next();
});

// DB
let db = mongoose.connection;
db.on('error', function(err) {
  console.log(err);
});

db.on('open', function() {
  console.log('Connected to DB');
});

const Book = require('./models').Book;
const User = require('./models').User;
const Trade = require('./models').Trade;

// Passport Config
require('./config/passport.js')(passport);

// Book API
const option = require('./config/bookapi.js');

// Routes
const auth = require('./routes/auth.js');
app.use('/auth', auth);
const profile = require('./routes/profile.js');
app.use('/profile',profile);
const trade = require('./routes/trade.js');
app.use('/trade',trade);
const allbooks = require('./routes/allbooks.js');
app.use('/allbooks',allbooks);