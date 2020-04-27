require('dotenv').config();

module.exports = {
  development: {
    host: process.env.DEV_DB_HOST,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    dialect: 'postgres',
    isSync: false,
    alter: false,
    logging: false,
    pool: {
      max: 50,
      min: 0,
      idle: 10,
    },
  },
  test: {
    host: process.env.TEST_DB_HOST,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    dialect: 'postgres',
    isSync: false,
    alter: false,
    logging: false,
    pool: {
      max: 50,
      min: 0,
      idle: 10,
    },
  },
};
