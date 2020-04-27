const { expect } = require('chai');
const ListProducts = require('src/app/product/ListProducts');

describe('App :: Product :: ListProducts', () => {
  let listProducts;

  context('when query is successful', () => {
    before(() => {
      const MockProductsRepository = {
        getAll: () => Promise.resolve('some products....'),
      };

      listProducts = new ListProducts({
        ProductRepository: MockProductsRepository,
      });
    });

    it('returns a promise that returns products when resolved', (done) => {
      const response = listProducts.execute();
      expect(response).to.be.a('promise');
      done();
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockProductsRepository = {
        getAll: () => Promise.reject(new Error('Failed')),
      };

      listProducts = new ListProducts({
        ProductRepository: MockProductsRepository,
      });
    });

    it('throws the error', async () => {
      try {
        await listProducts.execute();
      } catch (error) {
        expect(error.message).to.equal('Failed');
      }
    });
  });
});
