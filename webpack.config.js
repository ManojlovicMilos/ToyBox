import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: './app/app.ts',
  output: {
    filename: 'toybox.mjs',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: "module"
    },
    publicPath: "/resources/",
  },
  experiments: {
    outputModule: true
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
