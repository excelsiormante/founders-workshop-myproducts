const request = require('test/support/request');
const { expect } = require('chai');
const factory = require('test/support/factory');

describe('API :: POST /api/offers', () => {
  context('when sent data is ok', () => {
    it('creates and returns 201 and the new offer', async () => {
      const category = await factory.create('category');
      const product = await factory.create('product', {
        categories: [category.uuid],
      });

      const { body } = await request()
        .post('/api/offers')
        .send({
          name: 'New Offer',
          type: 'all',
          itemUUID: [product.uuid, category.uuid],
          discount: 20,
        })
        .expect(201);

      expect(body.statusCode).to.equal(201);
      expect(body.message).to.equal('success');
      expect(body.data.uuid).to.exist;
      expect(body.data.name).to.equal('New Offer');
      expect(body.data).to.have.all.keys('uuid', 'name', 'type', 'discount', 'itemUUID', 'createdAt', 'updatedAt');
    });
  });

  context('when name, type, itemUUID or discount is missing', () => {
    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request()
        .post('/api/offers')
        .expect(400);

      expect(body.statusCode).to.equal(400);
      expect(body.message).to.equal('Validation Error');
      expect(body.error.code).to.equal('VALIDATION_ERROR');
      expect(body.error.details).to.have.lengthOf(4);
      expect(body.error.details[0].message).to.equal('"name" is required');
      expect(body.error.details[1].message).to.equal('"type" is required');
      expect(body.error.details[2].message).to.equal('"itemUUID" is required');
      expect(body.error.details[3].message).to.equal('"discount" is required');
    });
  });
});
