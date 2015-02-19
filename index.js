"use strict";

var express = require("express");
var bodyParser = require('body-parser');
var logger = require("morgan");
var less = require('less-middleware');
var env = process.env.NODE_ENV || 'development';
var app = express();
var port = env == "production" ? 80 : 8000;
var db = require("./config/database")(env);

var Picture = require('./app/models/picture');

app.set('view engine', 'jade');
app.locals.pretty = true;
app.locals.env = env;

app.use(logger());
app.use(bodyParser());
app.use(less(__dirname + "/public", {
  parser: {
    paths: [
      "./public", "./bower_components/pain.less.css/src"
    ]
  }
}));
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res) { res.render("index"); });
app.post("/", function(req, res) {
  Picture.findOrCreate(req.param("template"), function(picture) {
    res.redirect("/p/"+ picture.hash);
  });
});
app.get("/p/:hash.gif", function(req, res) {
  Picture.find(req.param("hash"), function(picture) {
    res.end(picture.data, { 'Content-Type': 'image/gif' });
  });
});
app.get("/p/:hash", function(req, res) {
  Picture.find(req.param("hash"), function(picture) {
    res.render("show", {picture: picture});
  });
});


app.listen(port, function() {
  console.log("Listening on port: ", port);
});

module.exports = app;
