const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: DELETE /api/products/:id', () => {
  context('when product exists', () => {
    it('deletes the product and return status 202', async () => {
      const product = await factory.create('product', {
        name: 'Product',
      });

      await request()
        .delete(`/api/products/${product.uuid}`)
        .expect(202);
    });
  });

  context('when product does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const { body } = await request()
        .delete('/api/products/69fe54a4-1c74-4bae-95a7-48e84dde330c')
        .send({
          name: 'Updated Product',
        })
        .expect(404);

      expect(body.statusCode).to.equal(404);
      expect(body.message).to.equal('Not Found');
      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('products with id 69fe54a4-1c74-4bae-95a7-48e84dde330c can\'t be found.');
    });
  });
});
