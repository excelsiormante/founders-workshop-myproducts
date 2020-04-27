const { expect } = require('chai');
const DeleteProduct = require('src/app/product/DeleteProduct');

describe('App :: Product :: DeleteProduct', () => {
  let deleteProduct;

  context('when product exists', () => {
    before(() => {
      const MockProductsRepository = {
        remove: () => Promise.resolve(),
      };

      deleteProduct = new DeleteProduct({
        ProductRepository: MockProductsRepository,
      });
    });

    it('returns a promise that deletes the product when resolved', async () => {
      const response = deleteProduct.execute();
      expect(response).to.be.a('promise');
    });
  });

  context('when the product does not exist', () => {
    before(() => {
      const MockProductsRepository = {
        remove: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      deleteProduct = new DeleteProduct({
        ProductRepository: MockProductsRepository,
      });
    });

    it('throws a NotFound error', async () => {
      try {
        await deleteProduct.execute(1);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockProductsRepository = {
        remove: () => Promise.reject(new Error('Some Error')),
      };

      deleteProduct = new DeleteProduct({
        ProductRepository: MockProductsRepository,
      });
    });

    it('throws the error', async () => {
      try {
        await deleteProduct.execute(1);
      } catch (err) {
        expect(err.message).to.equal('Some Error');
      }
    });
  });
});
