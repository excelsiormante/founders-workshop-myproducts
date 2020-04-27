const request = require('test/support/request');
const factory = require('test/support/factory');

const { expect } = require('chai');

describe('API :: GET /api/offers/:uuid', () => {
  context('when offer exists', () => {
    it('returns the offer and status 200', async () => {
      const offer = await factory.create('offer', {
        name: 'The Offer',
      });

      const { body } = await request()
        .get(`/api/offers/${offer.uuid}`)
        .expect(200);

      expect(body.statusCode).to.equal(200);
      expect(body.message).to.equal('success');
      expect(body.data.uuid).to.equal(offer.uuid);
      expect(body.data.name).to.equal('The Offer');
    });
  });

  context('when offer does not exist', () => {
    it('returns a not found error and status 404', async () => {
      const { body } = await request()
        .get('/api/offers/69fe54a4-1c74-4bae-95a7-48e84dde330c')
        .expect(404);

      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('offers with id 69fe54a4-1c74-4bae-95a7-48e84dde330c can\'t be found.');
    });
  });
});
