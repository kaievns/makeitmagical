"use strict";

var slide = require("./magic/slide");
var animator = require("./magic/animator");

exports.create = function(text, filename) {
  var slides = build_slides(text, 10);

  animator.create(slides, filename);
}

function build_slides(text, size) {
  var slides = [];

  for (var i=0; i < size; i++) {
    slides.push(slide.create(text));
  }

  return slides;
}
