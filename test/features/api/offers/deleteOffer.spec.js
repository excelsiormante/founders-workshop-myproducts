const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: DELETE /api/offers/:uuid', () => {
  context('when offer exists', () => {
    it('deletes the offer and return status 202', async () => {
      const offer = await factory.create('offer');

      await request()
        .delete(`/api/offers/${offer.uuid}`)
        .expect(202);
    });
  });

  context('when offer does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const { body } = await request()
        .delete('/api/offers/69fe54a4-1c74-4bae-95a7-48e84dde330c')
        .send({
          name: 'Updated Offer',
        })
        .expect(404);

      expect(body.statusCode).to.equal(404);
      expect(body.message).to.equal('Not Found');
      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('offers with id 69fe54a4-1c74-4bae-95a7-48e84dde330c can\'t be found.');
    });
  });
});
