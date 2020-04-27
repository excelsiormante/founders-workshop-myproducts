const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/categories', () => {
  context('when there are categories', () => {
    beforeEach(() => factory.createMany('category', 2, [
      { name: 'First' },
      { name: 'Second' },
    ]));

    it('return success with array of categories', async () => {
      const { body } = await request()
        .get('/api/categories')
        .expect(200);

      expect(body.statusCode).to.equal(200);
      expect(body.message).to.equal('success');
      expect(body.data).to.exist;
      expect(body.data).to.have.lengthOf(2);

      expect(body.data[0].name).to.equal('First');
      expect(body.data[0]).to.have.all.keys('uuid', 'name', 'createdAt', 'updatedAt');

      expect(body.data[1].name).to.equal('Second');
      expect(body.data[1]).to.have.all.keys('uuid', 'name', 'createdAt', 'updatedAt');
    });
  });

  context('when there are no categories', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/categories')
        .expect(200);

      expect(body.data).to.have.lengthOf(0);
    });
  });
});
