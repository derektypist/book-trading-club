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
  res.locals.user = req.user;
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

// App Start
app.get('/', function(req, res) {
  books.search('Web Development', {
    field: 'title',
    offset: 0,
    limit: 9,
    type: 'books',
    order: 'relevance',
    lang: 'en'
  }, function(error,results,apiResponse) {
    if (error) {
      res.send(error);
    } else {
      res.render('index', {
        title: 'Home',
        books: results
      });
    }
  });
});

app.get('/search', function(req,res) {
  let title = req.query.title;
  books.search(title, {
    field: 'title',
    offset: 0,
    limit: 40,
    type: 'books',
    order: 'relevance',
    lang: 'en'
  }, function(error,results,apiResponse) {
    if (!error) {
      res.render('search', {
        title: 'Search Book',
        books: results
      });
    } else {
      console.log(error);
      res.status(404).send('File Not Found!');
    }
  });
});

// Start Server
app.listen(process.env.PORT || 3000, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});