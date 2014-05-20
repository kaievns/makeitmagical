"use strict";

var express = require("express");
var bodyParser = require('body-parser');
var logger = require("morgan");
var less = require('less-middleware');
var env = process.env.NODE_ENV || 'development';
var app = express();
var port = env == "production" ? 80 : 3000;

var magic = require("./app/magic");

app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(logger());
app.use(bodyParser());
app.use(less(__dirname + "/public"))
app.use(express.static(__dirname + '/public'));

app
  .route("/")
    .get(function(req, res) { res.render("index"); })
    .post(function(req, res) {
      magic.create(req.param("template"), function(data) {
        res.end(data, { 'Content-Type': 'image/gif' });
      });
    });

app.listen(port);

console.log("Listening on port: ", port)
