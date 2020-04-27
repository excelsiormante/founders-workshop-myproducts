const { expect } = require('chai');
const ShowProduct = require('src/app/product/ShowProduct');

describe('App :: Product :: ShowProduct', () => {
  let showProduct;

  context('when product exists', () => {
    beforeEach(() => {
      const MockProductsRepository = {
        getById: (productId) => Promise.resolve({
          id: productId,
          name: 'The Product',
        }),
      };

      showProduct = new ShowProduct({
        ProductRepository: MockProductsRepository,
      });
    });

    it('returns a promise with the product when resolved', (done) => {
      const response = showProduct.execute(1);
      expect(response).to.be.a('promise');
      response.then((product) => {
        expect(product.id).to.equal(1);
        expect(product.name).to.equal('The Product');
        done();
      });
    });
  });

  context('when product does not exist', () => {
    beforeEach(() => {
      const MockProductsRepository = {
        getById: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      showProduct = new ShowProduct({
        ProductRepository: MockProductsRepository,
      });
    });

    it('throws a NotFoundError', async () => {
      try {
        await showProduct.execute(1);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });
});
