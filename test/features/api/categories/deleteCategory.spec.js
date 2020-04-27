const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: DELETE /api/categories/:uuid', () => {
  context('when category exists', () => {
    it('deletes the category and return status 202', async () => {
      const category = await factory.create('category');

      await request()
        .delete(`/api/categories/${category.uuid}`)
        .expect(202);
    });
  });

  context('when category does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const { body } = await request()
        .delete('/api/categories/69fe54a4-1c74-4bae-95a7-48e84dde330c')
        .send({
          name: 'Updated Category',
        })
        .expect(404);

      expect(body.statusCode).to.equal(404);
      expect(body.message).to.equal('Not Found');
      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('categories with id 69fe54a4-1c74-4bae-95a7-48e84dde330c can\'t be found.');
    });
  });
});
