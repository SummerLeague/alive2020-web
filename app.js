#!/usr/bin/env node

// Setup ========================================================================
var path = require("path");
var env = require("dotenv").load();
var express = require("express");
var config = require("config");
var app = express();
var server = require("http").createServer(app);
var morgan = require("morgan");
var bodyParser = require("body-parser");
var expressLayouts = require('express-ejs-layouts');
var webpack = require('webpack');
var webpackConfig = require(path.resolve(__dirname, "webpack.development.js"));
var webpackMiddleware = require('webpack-dev-middleware');
var webpackCompiler = webpack(webpackConfig);


// Configure Application  =======================================================
app.use(express.logger());
if (app.get("env") == "development") {
  app.use(morgan("dev"));
}
if (app.get("env") == "production") {
  app.use(morgan("common"));
}


// View Helpers =================================================================
app.locals = require(path.join(__dirname, "app/helpers"))(app);


// Views ========================================================================
app.set("views", path.join(__dirname, "app/views"));
app.set('layout', path.join(__dirname, "app/views/layouts/default"));
app.set("view engine", "ejs");
app.use(expressLayouts);


// Webpack ======================================================================
if (app.get("env") == "development") {
  app.use(webpackMiddleware(webpackCompiler, {
    publicPath : webpackConfig.output.publicPath,
    stats : { colors: true }
  }));
}


// Routes =======================================================================
app.use(express.methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.favicon(path.resolve(__dirname, "public/images/favicon.ico")));
app.use(app.router);
require("./config/routes")(app);


// Error Handling ===============================================================
if (app.get("env") == "development") {
  app.use(function(err) {
    console.log(err);
  });
}
app.use(function(err, req, res, next) {
  res.send(500, "Something went wrong.");
});


// Begin Listening ==============================================================
server.listen(config.express.port, function(error) {
  if (error) {
    console.log("Unable to listen for connections: %s", error);
    process.exit(10);
  }
  console.log("🌸  Web app is running on port: %s", config.express.port);
});
