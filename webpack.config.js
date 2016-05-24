'use strict';

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var HOST = process.env.WEBPACK_HOST || 'localhost';
var PORT = process.env.WEBPACK_PORT || '4000';
var NODE_ENV = process.env.NODE_ENV || 'development';

var baseConfig = {
  entry: {
    application: [
      path.resolve(__dirname, 'src/index.js')
    ]
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: 'chunk-[id].name.js',
    sourceMapFilename: '[file].map',
    pathInfo: true
  },

  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
    alias: {
      app: path.join(__dirname, 'src'),
    }
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: NODE_ENV !== 'production'
        }
      },

      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      }
    })
  ]
};

var developmentConfig = merge.smart({
  entry: {
    application: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${HOST}:${PORT}`,
      'webpack/hot/only-dev-server'
    ]
  }
}, baseConfig, {
  devtool: 'cheap-module-eval-source-map',

  debug: true,

  module: {
    preLoaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  eslint: {
    emitError: false,
    emitWarning: false,
    failOnWarning: false,
    failOnError: false,
  }
});

var testConfig = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};

var productionConfig = merge.smart(baseConfig, {});

module.exports = ((function() {
  switch (NODE_ENV.toLowerCase()) {
    case 'development':
      return developmentConfig;
    case 'test':
      return testConfig;
    case 'production':
      return productionConfig;
    default:
      throw new Error('Invalid NODE_ENV!');
  }
})());
