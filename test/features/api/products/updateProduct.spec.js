const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');


describe('API :: PUT /api/products/:uuid', () => {
  context('when product exists', () => {
    context('when sent data is ok', () => {
      it('updates and returns 202 with the updated product', async () => {
        const product = await factory.create('product', {
          name: 'Product',
        });

        const category1 = await factory.create('category');
        const category2 = await factory.create('category');

        const { body } = await request()
          .put(`/api/products/${product.uuid}`)
          .field('name', 'Updated Product')
          .field('description', 'updated product description')
          .field('price', 50)
          .field('categories', `${category1.uuid},${category2.uuid}`)
          .attach('image', 'test/support/testImage.jpg')
          .expect(202);
        expect(body.statusCode).to.equal(202);
        expect(body.message).to.equal('success');
        expect(body.data.uuid).to.equal(product.uuid);
        expect(body.data.name).to.equal('Updated Product');
        expect(body.data.description).to.equal('updated product description');
        expect(body.data).to.have.all.keys('uuid', 'name', 'description', 'price', 'categories', 'imageURL', 'createdAt', 'updatedAt');
      });
    });

    context('when name or price is missing', () => {
      it('does update and returns 400 with the validation error', async () => {
        const product = await factory.create('product', {
          name: 'Product',
        });
        const { body } = await request()
          .put(`/api/products/${product.uuid}`)
          .expect(400);

        expect(body.statusCode).to.equal(400);
        expect(body.message).to.equal('Validation Error');
        expect(body.error.code).to.equal('VALIDATION_ERROR');
        expect(body.error.details).to.have.lengthOf(2);
        expect(body.error.details[0].message).to.equal('"name" is required');
        expect(body.error.details[1].message).to.equal('"price" is required');
      });
    });
  });

  context('when product does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const { body } = await request()
        .put('/api/products/69fe54a4-1c74-4bae-95a7-48e84dde330c')
        .send({
          name: 'Updated Product',
          price: 10,
        })
        .expect(404);

      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('products with id 69fe54a4-1c74-4bae-95a7-48e84dde330c can\'t be found.');
    });
  });
});
