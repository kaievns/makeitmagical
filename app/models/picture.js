"use strict";

var crypto = require('crypto');
var magic = require("../magic");
var db = global.db;
var pictures = db.collection("pictures");
var Picture = module.exports = {};

pictures.ensureIndex(["hash", "template"]);

Picture.find = function(hash, callback) {
  pictures.findOne({hash: hash}, function(err, picture) {
    if (err) { console.log("ERROR mongo: ", err); }

    if (picture) {
      picture.data = new Buffer(picture.data, 'base64');
    }

    callback(picture);
  });
};

Picture.create = function(template, callback) {
  magic.create(template, function(buffer) {
    var data = {
      hash: generate_hash(template),
      template: template,
      data: buffer.toString("base64")
    };

    pictures.save(data, function(err) {
      if (err) console.log("Failed to save", err)

      Picture.find(data.hash, callback);
    });
  });
};

Picture.findOrCreate = function(template_string, callback) {
  var template = cleanup_template(template_string);
  var hash = generate_hash(template);

  Picture.find(hash, function(picture) {
    if (picture) {
      callback(picture);
    } else {
      Picture.create(template, callback);
    }
  });
};


function cleanup_template(string) {
  return string;
};

function generate_hash(string, length) {
  return crypto.createHash("md5").update(string)
    .digest("base64").replace(/\//g, '').substr(0, length || 8);
};
