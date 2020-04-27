const request = require('supertest');

const container = require('src/container');

const server = container.resolve('server');

module.exports = () => request(server.express);
