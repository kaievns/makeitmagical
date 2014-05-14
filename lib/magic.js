"use strict";

var slide = require("./magic/slide");

exports.create = function(text, file) {
  slide.create(text).write("test.gif", function(err) {
    err && console.log(err);
  });
}
