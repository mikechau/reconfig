'use strict';

module.exports = (function() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return ({
        extends: 'eslint-config-mc/warning'
      });
    default:
      return ({
        extends: 'eslint-config-mc'
      });
  }
})();

