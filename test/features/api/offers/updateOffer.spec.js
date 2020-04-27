const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: PUT /api/offers/:uuid', () => {
  context('when offer exists', () => {
    context('when sent data is ok', () => {
      it('updates and returns 202 with the updated offer', async () => {
        const offer = await factory.create('offer');
        const category = await factory.create('category');
        const product = await factory.create('product', {
          categories: [category.uuid],
        });

        const { body } = await request()
          .put(`/api/offers/${offer.uuid}`)
          .send({
            name: 'Updated Offer',
            type: 'all',
            itemUUID: [product.uuid, category.uuid],
            discount: 30,
          })
          .expect(202);
        expect(body.data.uuid).to.equal(offer.uuid);
        expect(body.data.name).to.equal('Updated Offer');
      });
    });

    context('when name, type, itemUUID or discount is missing', () => {
      it('does update and returns 400 with the validation error', async () => {
        const offer = await factory.create('offer');
        const { body } = await request()
          .put(`/api/offers/${offer.uuid}`)
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

  context('when offer does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const category = await factory.create('category');
      const product = await factory.create('product', {
        categories: [category.uuid],
      });
      const { body } = await request()
        .put('/api/offers/69fe54a4-1c74-4bae-95a7-48e84dde330c')
        .send({
          name: 'Updated Offer',
          type: 'all',
          itemUUID: [product.uuid, category.uuid],
          discount: 30,
        })
        .expect(404);

      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('offers with id 69fe54a4-1c74-4bae-95a7-48e84dde330c can\'t be found.');
    });
  });
});
