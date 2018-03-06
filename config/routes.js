var path = require("path");


module.exports = function(app) {
  // Static =======================================================================
  [
    "users"
  ].forEach(function (routeName) {
    require(path.resolve("app/controllers/" + routeName))(app);
  });
  app.use(app.router);


  // Everything Else ==============================================================
  app.get("*", function(req, res) {
    res.render("errors/404");
  });
};
