var app     = require('../server'),
    path    = require('path');

var indexController = {

  home: function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));
  }

};

module.exports = indexController;
