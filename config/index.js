require('dotenv').config();

const fs = require('fs');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

const loadDatabaseConfig = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }

  return undefined;
};

const loadLoggingConfig = () => {
  if (fs.existsSync(path.join(__dirname, './logging.js'))) {
    return require('./logging.js')[ENV];
  }

  return undefined;
};

module.exports = {
  db: loadDatabaseConfig(),
  logging: loadLoggingConfig(),
  env: ENV,
  web: {
    port: process.env.PORT || 8000,
    baseUrl: process.env.baseURL || `http://localhost:${process.env.PORT || 8000}`,
  },
  storage: {
    productPhotoPath: 'img/products',
  },
};
