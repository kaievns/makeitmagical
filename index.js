"use strict";

var magic = require("./lib/magic");
var text  =
  "\\             \n" +
  " \\ji          \n" +
  " /.(((         \n" +
  "(,/\"(((__,--. \n" +
  "    \\  ) _( /{\n" +
  "    !|| \" :|| \n" +
  "    !||   :||  \n" +
  "    '''   '''    "
;


// var text = "\
// ******************\n\
// *                *\n\
// *                *\n\
// *                *\n\
// *                *\n\
// *                *\n\
// *                *\n\
// ******************\n\
// ";

magic.create(text, function(data) {
  var fs = require("fs");
  console.log(data.toString("base64").length);
  fs.writeFile("test.gif", data);
});
