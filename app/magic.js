"use strict";

var slide = require("./magic/slide");
var animate = require("./magic/animate");

exports.create = function(text, callback) {
  var slides = build_slides(text, 5);

  animate.create(slides, function(data) {
    callback(data);
  });
}

function build_slides(text, size) {
  var slides = [];

  for (var i=0; i < size; i++) {
    slides.push(slide.create(text));
  }

  return slides;
}
