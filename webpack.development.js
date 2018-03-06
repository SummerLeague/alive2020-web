const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  output: {
    filename: "webpack.bundle.js",
    publicPath: "/dist"
  }
});
