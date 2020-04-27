const request = require('test/support/request');
const { expect } = require('chai');

describe('API :: POST /api/categories', () => {
  context('when sent data is ok', () => {
    it('creates and returns 201 and the new category', async () => {
      const { body } = await request()
        .post('/api/categories')
        .send({
          name: 'New Category',
          description: 'new category description',
          price: 50,

        })
        .expect(201);

      expect(body.statusCode).to.equal(201);
      expect(body.message).to.equal('success');
      expect(body.data.uuid).to.exist;
      expect(body.data.name).to.equal('New Category');
      expect(body.data).to.have.all.keys('uuid', 'name', 'createdAt', 'updatedAt');
    });
  });

  context('when name is missing', () => {
    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request()
        .post('/api/categories')
        .expect(400);

      expect(body.statusCode).to.equal(400);
      expect(body.message).to.equal('Validation Error');
      expect(body.error.code).to.equal('VALIDATION_ERROR');
      expect(body.error.details).to.have.lengthOf(1);
      expect(body.error.details[0].message).to.equal('"name" is required');
    });
  });
});
