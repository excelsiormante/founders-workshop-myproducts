const path = require('path');

const devLogFile = path.join(__dirname, '../logs/development.log');
const testLogFile = path.join(__dirname, '../logs/testLogFile.log');

module.exports = {
  development: {
    console: {
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true,
    },
    file: {
      level: 'info',
      filename: devLogFile,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
  },
  test: {
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
    file: {
      level: 'info',
      filename: testLogFile,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
  },
};
