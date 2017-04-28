var express     = require('express'),
    app         = module.exports = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    routes      = require('./routes.js'),
    config      = require('./config.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(routes);

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000, function () {});
// mongoose.connect(config.database);
app.set('secret', config.secret);

