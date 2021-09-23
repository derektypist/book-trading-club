const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Book = require('../models').Book;
const Trade = require('../models').Trade;

// Routers
router.get('/',isLoggedIn, function(req,res) {
  res.render('trade', {
    title: "Trade"
  });
});