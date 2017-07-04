var config = require("config"),
    request = require("request-json"),
    _ = require("underscore");


// Actions ======================================================================
function profile(req, res, next) {
  var username = req.params.username;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // NOTE: This is all temporary. Just getting something in browser.
  //   Ignore the desire to refactor for now.
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  var client = request.createClient(config.app.alive2020ApiUrl);

  var qs = {
    username : username
  };

  client.get("stories/primary_story", { qs : qs }, function(err, apiResponse, body) {
    if (apiResponse.statusCode == 404 || apiResponse.statusCode == 500) {
      res.render("errors/404");
    } else {
      var webmSource = _.find(body.story.storyMedia, function (item) {
        return item.type == "webm";
      }).url;

      var mp4Source = _.find(body.story.storyMedia, function (item) {
        return item.type == "mp4";
      }).url;

      res.render(
        "users/show",
        {
          webmSource : webmSource,
          mp4Source : mp4Source
        }
      );
    }
  });
};


// Exports ======================================================================
module.exports = function(app) {
  app.get("/:username", profile);
}
