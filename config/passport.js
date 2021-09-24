const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models').User;

module.exports = function(passport) {

  // Serialization and Deserialization
  passport.serializeUser(function(user,done) {
    done(null,user.id);
  });

  passport.deserializeUser(function(id,done) {
    User.findById(id, function(err,user) {
      done(err,user);
    });
  });
};