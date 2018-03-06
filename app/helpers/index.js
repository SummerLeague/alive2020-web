var path = require("path"),
    ApplicationHelpers = require("./application_helpers");
    ReactHelpers = require("./react_helpers");

// TODO: This could be better. Could probably loop over required files to build this object.
module.exports = function (app) {
  return Object.assign(
    {},
    ApplicationHelpers(app),
    ReactHelpers(app)
  );
}
