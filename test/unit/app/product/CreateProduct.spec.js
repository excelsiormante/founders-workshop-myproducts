const { expect } = require('chai');
const CreateProduct = require('src/app/product/CreateProduct');
const { ValidationError } = require('src/domain/error/errors').types;
const utils = require('src/interfaces/http/utils');
const config = require('config');

describe('App :: Product :: CreateProduct', () => {
  let createProduct;

  context('when product is valid', () => {
    before(() => {
      const MockProductsRepository = {
        add: (product) => Promise.resolve(product),
      };

      createProduct = new CreateProduct({
        ProductRepository: MockProductsRepository,
        config,
        utils,
      });
    });

    it('creates the product', async () => {
      const productData = {
        name: 'New Product',
        description: 'new product description',
        price: 50,
      };

      const response = await createProduct.execute(productData);
      expect(response.name).to.equal('New Product');
    });
  });

  context('when product is invalid', () => {
    before(() => {
      const MockProductsRepository = {
        add: (product) => Promise.resolve(product),
      };

      createProduct = new CreateProduct({
        ProductRepository: MockProductsRepository,
        utils,
        config,
      });
    });

    it('throws an error of type "ValidationError"', async () => {
      const productData = {}; // property "name" is required, therefore invalid

      try {
        await createProduct.execute(productData);
      } catch (err) {
        expect(err.name).to.equal(ValidationError);
        expect(err.message).to.equal('Validation Error');
        expect(err.details).lengthOf(2);
        expect(err.details[0].message).to.equal('"name" is required');
      }
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockProductsRepository = {
        add: () => Promise.reject(new Error('Some Error')),
      };

      createProduct = new CreateProduct({
        ProductRepository: MockProductsRepository,
        utils,
        config,
      });
    });

    it('throws the error', async () => {
      const productData = {
        name: 'New Product',
        description: 'new product description',
        price: 50,
      };

      try {
        await createProduct.execute(productData);
      } catch (err) {
        expect(err.message).to.equal('Some Error');
      }
    });
  });
});
