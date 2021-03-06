module.exports = function (passport) {

  var LocalStrategy   = require('passport-local').Strategy,
      FacebookStrategy  = require('passport-facebook'),
      User            = require('./models/user'),
      secrets           = require('./secrets');

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email', // change username to email
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    // find user with unique email
    User.findOne({ 'email' :  email }, function(err, user) {
      // if there are any errors, return the error
      if (err)
        return done(err);
      // check to see if email is taken
      if (user) {
        return done(null, false);
      } else {
        var newUser = new User();

        newUser.email = email;
        newUser.password = newUser.generateHash(password);

        newUser.save(function(err) {
          if (err)
            throw err;
          return done(null, newUser);
        });
      }
    });
  }));

 passport.use('local-login', new LocalStrategy({
    // override username to be email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    //Check for unique user email
    User.findOne({ 'email' :  email }, function(err, user) {
      if (err)
        return done(err);

      if (!user)
        return done(null, false);

      // if the user is found but the password is wrong
      if (!user.validPassword(password))
        return done(null, false);
      return done(null, user);
    });

  }));

 passport.use(new FacebookStrategy({
  clientID : secrets.facebook.clientID,
  clientSecret: secrets.facebook.clientSecret,
  callbackURL: secrets.facebook.callbackURL
 }, function(token, refreshToken, profile, done) {
  console.log(profile);
  process.nextTick(function() {
    User.findOne({ 'facebook.id': profile.id}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      } else {
        var newUser = new User();

        newUser.facebook.id = profile.id;
        newUser.facebook.token = token;
        newUser.facebook.name = profile.displayName;

        newUser.save(function(err) {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      }
    });
  });
 }));

};
