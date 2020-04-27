const dataFaker = require('test/support/dataFaker');

module.exports = (factory, { OfferModel }) => {
  factory.define('offer', OfferModel, {
    name: dataFaker.word(),
    type: 'all',
    discount: dataFaker.floating(),
  });
};
