"use strict";

exports.create = function(slides, callback) {
  create_animated_gif(slides, callback);
}

var fs = require("fs");
var gm = require("gm");
var sys = require('sys');
var exec = require('child_process').exec;

function create_animated_gif(slides, callback) {
  var tmp = mktmp_dir();
  var width = slides[0]._size[0];
  var height = slides[0]._size[1];
  var outfile = tmp + "/result.gif"

  save(slides, tmp, function() {
    exec("convert -delay 16 -loop 0 "+ tmp + "/*.gif "+ outfile, function() {
      fs.readFile(outfile, function(err, data) {
        if (err) console.log("Couldn't read result file", err);

        callback(data);
        cleanup(tmp);
      });
    });
  });
}

function save(slides, dir, callback) {
  slides.forEach(function(slide, index) {
    slide.write(dir + "/" + index + ".gif", function(err) {
      if (err) console.log("Couldn't save file ", err);

      if (index == slides.length - 1) {
        callback();
      }
    });
  });
}

function mktmp_dir() {
  var tmp = "/tmp/magic-"+ new Date().getTime();

  if (!fs.existsSync(tmp)) {
    fs.mkdirSync(tmp);
  }

  return tmp;
}

function cleanup(dir) {
  exec("rm -rf "+ dir);
}
