"use strict";

var mongo = require("mongojs");
var localhost = "mongodb://localhost/makeitmakgical"
var urls = {
  development: localhost,
  production:  process.env.MONGOLAB_URI || localhost
}

module.exports = function(env) {
  return global.db = mongo(urls[env]);
}
