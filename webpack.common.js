const path = require("path");

config = {
  entry: path.resolve(__dirname, "app/webpack/entrypoints/app.js"),
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.jsx$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  }
};

config.resolve.alias = {
  Components: path.join(__dirname, "app", "webpack", "components"),
  Shared: path.join(__dirname, "app", "webpack", "components", "shared"),
  Utils: path.join(__dirname, "app", "webpack", "utils")
};

module.exports = config;
