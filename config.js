var secrets = require('./secrets');

module.exports = {

  'database': 'mongodb://' + secrets.db.username + ':' + secrets.db.password + '@ds123371.mlab.com:23371/maker_sights_coding_challenge'

};
