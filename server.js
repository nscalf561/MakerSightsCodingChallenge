var express       = require('express'),
    app           = module.exports = express(),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    session       = require('express-session'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    // path          = require('path'),
    routes        = require('./routes.js'),
    config        = require('./config.js'),
    secrets       = require('./secrets.js');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.use(session({secret: secrets.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.use(express.static(__dirname + '/views/html'));

app.listen(process.env.PORT || 3000, function () {});
mongoose.connect(config.database);
app.set('secret', config.secret);
