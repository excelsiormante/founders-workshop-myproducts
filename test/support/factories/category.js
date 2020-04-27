const dataFaker = require('test/support/dataFaker');

module.exports = (factory, { CategoryModel }) => {
  factory.define('category', CategoryModel, {
    name: dataFaker.word(),
  });
};
