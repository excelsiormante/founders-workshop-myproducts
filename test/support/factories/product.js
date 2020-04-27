const dataFaker = require('test/support/dataFaker');

module.exports = (factory, { ProductModel }) => {
  factory.define('product', ProductModel, {
    name: dataFaker.name(),
    description: dataFaker.sentence(),
    price: dataFaker.floating(),
  });
};
