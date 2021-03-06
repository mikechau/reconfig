'use strict';

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      assets: path.join(__dirname, 'src', 'assets')
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
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['style', 'css?sourceMap&importLoaders=1', 'postcss'])
      },

      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(['style', 'css?sourceMap&importLoaders=2', 'postcss', 'less?sourceMap'])
      },

      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          name: 'fonts/[name].[ext]',
          limit: 8192,
          mimetype: 'application/font-woff'
        }
      },

      {
        test: /\.(eot|svg|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          name: 'fonts/[name].[ext]',
          limit: 8192
        }
      },

      {
        test: /\.(jpe?g|png|gif|ico)$/,
        loader: 'url',
        query: {
          name: 'images/[name].[ext]',
          limit: 8192
        }
      },
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      }
    }),

    new webpack.optimize.OccurenceOrderPlugin(),

    new ExtractTextPlugin('[name]-[contenthash].css', {
      allChunks: true,
      disable: NODE_ENV !== 'production'
    }),
  ],

  postcss: [autoprefixer]
};

var developmentConfig = merge.smart({
  entry: {
    application: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://' + HOST + ':' + PORT,
      'webpack/hot/only-dev-server'
    ]
  }
}, baseConfig, {
  devtool: 'cheap-module-eval-source-map',

  debug: true,

  output: {
    publicPath: 'http://' + HOST + ':' + PORT + '/assets/'
  },

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
    failOnError: false
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

var productionConfig = merge.smart({}, baseConfig);

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
