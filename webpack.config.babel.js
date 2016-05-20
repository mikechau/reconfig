import path from 'path';
import webpack from 'webpack';

export const baseConfig = {
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
      app: path.join(__dirname, 'src')
    }
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },

  module: {
    preLoaders: [],

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: process.env.NODE_ENV !== 'production'
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
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ]
};

export const developmentConfig = merge.smart(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  debug: true
});

export const testConfig = merge.smart(baseConfig, {});

export const productionConfig = merge.smart(baseConfig, {});

export default function() {
  switch (process.env.NODE_ENV.toLowerCase()) {
    case 'development':
      return developmentConfig;
    case 'test':
      return testConfig;
    case 'production':
      return productionConfig;
    default:
      throw 'Invalid NODE_ENV!'
  }
}
