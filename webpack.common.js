const path = require('path');
const webpack = require('webpack');
const threeMinifier = require('@yushijinhun/three-minifier-webpack');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    },
    plugins: [new threeMinifier().resolver],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      h: ['preact', 'h'],
    }),
    new threeMinifier(),
  ],
};
