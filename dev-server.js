/* eslint no-console: 0 */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.babel';

const HOST = process.env.WEBPACK_HOST || 'localhost';
const PORT = process.env.WEBPACK_PORT || '4000';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: {
    index: './static/dev/index.html',
  },
  stats: {
    colors: true,
    assets: true,
    version: false,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
}).listen(PORT, HOST, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at ${HOST}:${PORT}...`);
});
