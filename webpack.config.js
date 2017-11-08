var path = require("path");
module.exports = {
  entry: {
    app: ["./app/app.ts"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    library: "Toybox",
    libraryTarget: "umd",
    filename: "toybox.js",
    publicPath: "/resources/"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};