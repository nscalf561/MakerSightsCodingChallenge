var express         = require('express'),
    router          = express.Router(),
    passport        = require('passport'),
    indexController = require('./controllers/indexController'),
    authController  = require('./controllers/authController');

require('./authConfig')(passport);

router.get('/', indexController.home);

router.route('/signup')
  .get(authController.getSignup)
  .post(passport.authenticate('local-signup', {failureRedirect:'/login'}),
    authController.postSignup);

router.route('/login')
  .get(authController.getLogin)
  .post(passport.authenticate('local-login', {failureRedirect:'/login'}),
    authController.postLocalLogin);

router.route('/logout')
  .get(authController.logout);

router.route('/profile')
  .get(authController.getProfile);

module.exports = router;
