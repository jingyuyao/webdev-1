var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main/js/react/app.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./src/main/resources/static/react"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["env", "react"]
        }
      }
    ]
  }
};
