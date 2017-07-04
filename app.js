#!/usr/bin/env node

// Setup ========================================================================
var path = require("path"),
    env = require("dotenv").load(),
    express = require("express"),
    config = require("config"),
    app = express(),
    server = require("http").createServer(app),
    morgan = require("morgan");

var bodyParser = require("body-parser");


// Configure Application  =======================================================
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.favicon(path.resolve(__dirname, "public/images/favicon.ico")));
app.use(express.logger());

if (app.get("env") == "development") {
  app.use(morgan("dev"));
  app.use(express.errorHandler({
    dumpExceptions : true,
    showStack : true
  }));
}

if (app.get("env") == "production") {
  app.use(morgan("common"));
  app.configure("production", function() {
    app.use(express.errorHandler());
  });
}


// Routes =======================================================================
app.use(express.methodOverride());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(app.router);
require("./config/routes")(app);


// TEMPORARY ====================================================================
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "app/views"));


// Begin Listening ==============================================================
server.listen(config.express.port, function(error) {
  if (error) {
    console.log("Unable to listen for connections: %s", error);
    process.exit(10);
  }
  console.log("🌸  Web app is running on port: %s", config.express.port);
});
