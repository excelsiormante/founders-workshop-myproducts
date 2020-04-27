const { expect } = require('chai');
const UpdateProduct = require('src/app/product/UpdateProduct');
const utils = require('src/interfaces/http/utils');
const config = require('config');

describe('App :: Product :: UpdateProduct', () => {
  let updateProduct;

  context('when product exists', () => {
    context('when data is valid', () => {
      before(() => {
        const MockProductsRepository = {
          update: (id, data) => Promise.resolve(data),
        };

        updateProduct = new UpdateProduct({
          ProductRepository: MockProductsRepository,
          utils,
          config,
        });
      });

      it('returns a Promise with the updated product upon resolve', (done) => {
        const productData = {
          name: 'Updated Product',
          description: 'updated product description',
          price: 50,
        };

        const response = updateProduct.execute(1, productData);
        expect(response).to.be.a('promise');
        response.then((product) => {
          expect(product.name).to.equal('Updated Product');
          done();
        });
      });
    });

    context('when data is invalid', () => {
      before(() => {
        const MockProductsRepository = {
          update: () => {
            const error = new Error('Validation Error');
            error.name = 'ValidationError';
            return Promise.reject(error);
          },
        };

        updateProduct = new UpdateProduct({
          ProductRepository: MockProductsRepository,
          utils,
          config,
        });
      });

      it('throws a ValidationError', async () => {
        const productData = {};
        try {
          await updateProduct.execute(1, productData);
        } catch (error) {
          expect(error.name).to.equal('ValidationError');
        }
      });
    });
  });

  context('when the product does not exist', () => {
    before(() => {
      const MockProductsRepository = {
        update: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      updateProduct = new UpdateProduct({
        ProductRepository: MockProductsRepository,
        utils,
        config,
      });
    });

    it('throws a NotFound error', async () => {
      const productData = {
        name: 'Updated Product',
        description: 'updated product description',
        price: 50,
      };

      try {
        await updateProduct.execute(1, productData);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockProductsRepository = {
        update: () => Promise.reject(new Error('Some Error')),
      };

      updateProduct = new UpdateProduct({
        ProductRepository: MockProductsRepository,
        utils,
        config,
      });
    });

    it('throws the error', async () => {
      const productData = {
        name: 'Updated Product',
        description: 'updated product description',
        price: 50,
      };

      try {
        await updateProduct.execute(1, productData);
      } catch (error) {
        expect(error.message).to.equal('Some Error');
      }
    });
  });
});
