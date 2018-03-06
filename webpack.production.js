const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "source-map",
  output: {
    filename: "webpack.bundle.js",
    path: path.resolve(__dirname, "public/dist"),
    publicPath: path.resolve(__dirname, "public")
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
});
