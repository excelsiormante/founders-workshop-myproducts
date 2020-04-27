const request = require('test/support/request');
const factory = require('test/support/factory');

const { expect } = require('chai');

describe('API :: GET /api/products/:id', () => {
  context('when product exists', () => {
    it('returns the product and status 200', async () => {
      const product = await factory.create('product', {
        name: 'The Product',
      });

      const { body } = await request()
        .get(`/api/products/${product.uuid}`)
        .expect(200);

      expect(body.statusCode).to.equal(200);
      expect(body.message).to.equal('success');
      expect(body.data.uuid).to.equal(product.uuid);
      expect(body.data.name).to.equal('The Product');
    });
  });

  context('when product does not exist', () => {
    it('returns a not found error and status 404', async () => {
      const { body } = await request()
        .get('/api/products/69fe54a4-1c74-4bae-95a7-48e84dde330c')
        .expect(404);

      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('products with id 69fe54a4-1c74-4bae-95a7-48e84dde330c can\'t be found.');
    });
  });
});
