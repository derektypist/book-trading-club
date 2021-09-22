// Set Up Constants

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;
const Book = require('../models').Book;
const User = require('../models').User;
const Trade = require('../models').Trade;

// Profile Route
router.get('/', isLoggedIn, function(req,res) {

});


// Login function
function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;