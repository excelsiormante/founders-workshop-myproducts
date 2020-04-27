const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/offers', () => {
  context('when there are offers', () => {
    beforeEach(() => factory.createMany('offer', 2, [
      {
        name: 'First',
        description: 'first offer',
        type: 'all',
        itemUUID: ['69fe54a4-1c74-4bae-95a7-48e84dde330c'],
        discount: 20,
      },
      {
        name: 'Second',
        description: 'second offer',
        type: 'all',
        itemUUID: ['69fe54a4-1c74-4bae-95a7-48e84dde330c'],
        discount: 30,
      },
    ]));

    it('return success with array of offers', async () => {
      const { body } = await request()
        .get('/api/offers')
        .expect(200);

      expect(body.statusCode).to.equal(200);
      expect(body.message).to.equal('success');
      expect(body.data).to.exist;
      expect(body.data).to.have.lengthOf(2);

      expect(body.data[0].name).to.equal('First');
      expect(body.data[0]).to.have.all.keys('uuid', 'name', 'type', 'discount', 'itemUUID', 'createdAt', 'updatedAt');

      expect(body.data[1].name).to.equal('Second');
      expect(body.data[1]).to.have.all.keys('uuid', 'name', 'type', 'discount', 'itemUUID', 'createdAt', 'updatedAt');
    });
  });

  context('when there are no offers', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/offers')
        .expect(200);

      expect(body.data).to.have.lengthOf(0);
    });
  });
});
