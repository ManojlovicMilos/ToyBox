var path = require("path");
module.exports = {
  entry: {
    app: ["./app/app.ts"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    library: "ToyBox",
    libraryTarget: "umd",
    filename: "toybox.js",
    publicPath: "/resources/"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' }
    ]
  }
};