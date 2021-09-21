const express = require('express');
const passport = require('passport');
const router = express.Router();

// Sign Up
router.get('/signup', function(req,res) {
  res.render('signup', {
    title: "Signup",
    message: "Signed Up"
  });
});

router.post('/signup', passport.authenticate('local-signup'), {
  successRedirect: 'auth/login',
  failureRedirect: 'auth/signup',
  failfureFlash: true
});



module.exports = router;