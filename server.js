const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const books = require('google-books-search');
const app = express();

// Set Up Template Engine
app.set('view engine','pug');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req,res,next) {
  res.locals.user = req.user();
  next();
});