var ejs = require("ejs");

module.exports = function (app) {

  var PageData = {};

  var reactComponent = function(name, data={}) {
    if (!PageData.hasOwnProperty(name)) {
      PageData[name] = {};
    }
    PageData[name] = Object.assign(PageData[name], data);

    return ejs.render("<div data-react-class='" + name + "'></div>");
  }

  return {
    PageData : PageData,
    reactComponent : reactComponent
  };
};
