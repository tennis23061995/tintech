'use strict';
/**
 * db config
 * @type {Object}
 */

exports.__esModule = true;
exports.default = {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  adapter: {
    mysql: {
      host: 'localhost',
      port: '3306',
      database: 'tintech',
      user: 'da_admin',
      password: 'ZDI5OTZh',
      prefix: 'li_',
      encoding: 'utf8'
    },
    mongo: {}
  }
};
//# sourceMappingURL=db.js.map