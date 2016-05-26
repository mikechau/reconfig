'use strict';

var merge = require('lodash/merge');

var config = ((function() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return ({
        extends: 'eslint-config-mc/warning',
      });
    default:
      return ({
        extends: 'eslint-config-mc'
      });
  }
})());

module.exports = merge({}, config, {
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    }
  }
});

