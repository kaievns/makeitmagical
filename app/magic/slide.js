"use strict";

exports.create = function(text, background) {
  return magicify(text, background);
};

var

gm           = require("gm"),
image_magick = gm.subClass({ imageMagick: true }),
font_name    = __dirname + "/font.ttf",
font_size    = 50,
text_width   = font_size * 0.6,
text_height  = font_size * 1.0,
padding_x    = 4, // in chars
padding_y    = 2  // in chars

;

function magicify(text, background) {
  var text = remove_empty_lines(text);
  var size = calculate_image_size(text);
  var image = new_image(size[0], size[1], background);

  draw(text, image);

  image._size = size;

  return image;
}

function remove_empty_lines(text) {
  return text
    .replace(/^(\s*?\n)([ \t]*[^\s])/m, "$2")
    .replace(/([^\s][ \t]*)(\n\s*)$/m, "$1")
    .replace(/\s+(\n|$)/mg, "$1");
}

function calculate_image_size(text) {
  var lines = text.split("\n"), max_width = 0;

  for (var i=0; i < lines.length; i++) {
    if (lines[i].length > max_width) {
      max_width = lines[i].length;
    }
  }

  return [
    (max_width + padding_x * 2) * text_width,
    (lines.length + padding_y * 2) * text_height
  ];
}

function new_image(width, height, bgcolor) {
  width   || (width = default_size);
  height  || (height = default_size);
  bgcolor || (bgcolor = "#000000");

  return image_magick(width, height, bgcolor)
    .font(font_name, font_size);
}

function draw(text, image) {
  var lines = text.split("\n");

  for (var y=0; y < lines.length; y++) {
    for (var x=0; x < lines[y].length; x++) {
      if (lines[y][x] != " ") {
        var pos_x = (x + padding_x - 0.1) * text_width;
        var pos_y = (y + padding_y + 0.9) * text_height;

        image.fill(random_color()).drawText(pos_x, pos_y, lines[y][x] == '\\' ? "\\\\" : lines[y][x]);
      }
    }
  }
}


function random_color() {
  var available_colors = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#00ffff',
    '#ff00ff',
    '#ffffff'
  ];

  return available_colors[
    ~~(Math.random() * available_colors.length)
  ];
}
