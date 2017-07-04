var path = require("path");


module.exports = function(app) {
  // Static =======================================================================
  [
    "users"
  ].forEach(function (routeName) {
    require(path.resolve("app/controllers/" + routeName))(app);
  });
  app.use(app.router);


  // Error Handling ===============================================================
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, "Something broke!");
  });


  // Everything Else ==============================================================
  app.get("*", function(req, res) {
    res.send(404);
  });
};
