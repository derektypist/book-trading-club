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
  Book.find({owner: req.user._id}).exec(function(err,books) {
    if (err) {
      console.log(err);
      return;
    }

    res.render("profile", {
      title: "Profile Page",
      books: books
    });
  });
});


// Login function
function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;