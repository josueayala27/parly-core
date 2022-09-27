const fs = require('fs');

module.exports = {
  entry: './src',
  output: {
    filename: 'api.bundle.js',
  },
  mode: 'production',
  target: 'node',
  externals: Object.fromEntries(
    fs
      .readdirSync('node_modules')
      .filter((x) => x !== 'bin')
      .map((x) => [x, `commonjs ${x}`])
  ),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
