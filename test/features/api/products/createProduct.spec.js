const request = require('test/support/request');
const { expect } = require('chai');
const factory = require('test/support/factory');

describe('API :: POST /api/products', () => {
  context('when sent data is ok', () => {
    it('creates and returns 201 and the new product', async () => {
      const category1 = await factory.create('category');
      const category2 = await factory.create('category');
      const { body } = await request()
        .post('/api/products')
        .field('name', 'New Product')
        .field('description', 'new product description')
        .field('price', 50)
        .field('categories', `${category1.uuid},${category2.uuid}`)
        .attach('image', 'test/support/testImage.jpg')
        .expect(201);
      expect(body.statusCode).to.equal(201);
      expect(body.message).to.equal('success');
      expect(body.data.uuid).to.exist;
      expect(body.data.name).to.equal('New Product');
      expect(body.data.description).to.equal('new product description');
      expect(body.data).to.have.all.keys('uuid', 'name', 'description', 'price', 'categories', 'imageURL', 'createdAt', 'updatedAt');
    });
  });

  context('when name or price is missing', () => {
    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request()
        .post('/api/products')
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
