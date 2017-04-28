var app      = require('../server'),
    path     = require('path'),
    passport = require('passport');

var authController = {

  getSignup: function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/signup.html'));
  },

  //TODO
  postSignup: function (req, res) {
    console.log('in post signup');
    // passport.authenticate('local-signup', {
    //   successRedirect: '/profile',
    //   failureRedirect: '/login'
    // });
    res.redirect('/profile');
  },

  getLogin: function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/login.html'));
  },

  postLocalLogin: function (req, res) {
    res.redirect('/profile');
    // passport.authenticate('local-login', {
    //   successRedirect: '/profile',
    //   failureRedirect: '/login'
    // });
  },

  getProfile: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.render('profile.html', {
        user: req.user
      });
    }
    res.redirect('/login');
  }

};

module.exports = authController;
