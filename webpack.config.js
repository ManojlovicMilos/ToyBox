const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app/app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: "ToyBox",
    libraryTarget: "umd",
    filename: 'toybox.js',
    publicPath: "/resources/"
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' }
    ]
  }
};
