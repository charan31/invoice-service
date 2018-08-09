const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (env === 'production') {
  module.export = require('./build/');
} else {
  require('babel-register');
  module.export = require('./src');
}
