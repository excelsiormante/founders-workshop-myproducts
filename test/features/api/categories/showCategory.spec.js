const request = require('test/support/request');
const factory = require('test/support/factory');

const { expect } = require('chai');

describe('API :: GET /api/categories/:uuid', () => {
  context('when category exists', () => {
    it('returns the category and status 200', async () => {
      const category = await factory.create('category', {
        name: 'The Category',
      });

      const { body } = await request()
        .get(`/api/categories/${category.uuid}`)
        .expect(200);

      expect(body.statusCode).to.equal(200);
      expect(body.message).to.equal('success');
      expect(body.data.uuid).to.equal(category.uuid);
      expect(body.data.name).to.equal('The Category');
    });
  });

  context('when category does not exist', () => {
    it('returns a not found error and status 404', async () => {
      const { body } = await request()
        .get('/api/categories/69fe54a4-1c74-4bae-95a7-48e84dde330c')
        .expect(404);

      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('categories with id 69fe54a4-1c74-4bae-95a7-48e84dde330c can\'t be found.');
    });
  });
});
