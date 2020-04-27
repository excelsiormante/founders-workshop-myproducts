const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: PUT /api/categories/:uuid', () => {
  context('when category exists', () => {
    context('when sent data is ok', () => {
      it('updates and returns 202 with the updated category', async () => {
        const category = await factory.create('category');

        const { body } = await request()
          .put(`/api/categories/${category.uuid}`)
          .send({
            name: 'Updated Category',
          })
          .expect(202);
        expect(body.data.uuid).to.equal(category.uuid);
        expect(body.data.name).to.equal('Updated Category');
      });
    });

    context('when name is empty', () => {
      it('does update and returns 400 with the validation error', async () => {
        const category = await factory.create('category', {
          name: 'Category',
        });
        const { body } = await request()
          .put(`/api/categories/${category.uuid}`)
          .send({
            name: '',
          })
          .expect(400);

        expect(body.statusCode).to.equal(400);
        expect(body.message).to.equal('Validation Error');
        expect(body.error.code).to.equal('VALIDATION_ERROR');
        expect(body.error.details).to.have.lengthOf(1);
        expect(body.error.details[0].message).to.equal('"name" is not allowed to be empty');
      });
    });
  });

  context('when category does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const { body } = await request()
        .put('/api/categories/69fe54a4-1c74-4bae-95a7-48e84dde330c')
        .send({
          name: 'Updated Category',
        })
        .expect(404);

      expect(body.error.code).to.equal('NOT_FOUND');
      expect(body.error.details).to.equal('categories with id 69fe54a4-1c74-4bae-95a7-48e84dde330c can\'t be found.');
    });
  });
});
