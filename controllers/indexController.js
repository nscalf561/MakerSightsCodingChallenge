var app     = require('../server'),
    path    = require('path');

var indexController = {

  home: function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
  }

};

module.exports = indexController;
