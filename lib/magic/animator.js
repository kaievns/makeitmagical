"use strict";

var fs = require("fs");
var gm = require("gm");
var sys = require('sys');
var exec = require('child_process').exec;

exports.create = function(slides, filename, callback) {
  var tmp = mktmp_dir();
  var width = slides[0]._size[0];
  var height = slides[0]._size[1];

  save(tmp, slides, function() {
    var command = filename;
    exec("convert -delay 16 -loop 0 "+ tmp + "/*.gif "+ filename, function() {
      callback();
      exec("rm -rf "+ tmp);
    });
  });
}

function save(tmp, slides, callback) {
  var filenames = []

  slides.forEach(function(slide, index) {
    var filename = tmp + "/" + index + ".gif";

    slide.write(filename, function(err) {
      if (err) console.log("Couldn't save file "+ filename, err);
      filenames.push(filename);

      if (index == slides.length - 1) {
        callback(filenames);
      }
    })
  });
}

function mktmp_dir() {
  var tmp = "/tmp/magic-"+ new Date().getTime();

  if (!fs.existsSync(tmp)) {
    fs.mkdirSync(tmp);
  }

  return tmp;
}
