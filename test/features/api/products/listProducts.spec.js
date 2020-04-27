const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/products', () => {
  context('when there are products', () => {
    beforeEach(() => factory.createMany('product', 2, [
      { name: 'First', price: 10 },
      { name: 'Second', price: 20 },
    ]));

    it('return success with array of products', async () => {
      const { body } = await request()
        .get('/api/products')
        .expect(200);

      expect(body.statusCode).to.equal(200);
      expect(body.message).to.equal('success');
      expect(body.data).to.exist;
      expect(body.data).to.have.lengthOf(2);
      expect(body.data[0]).to.have.all.keys('uuid', 'name', 'description', 'price', 'categories', 'imageURL', 'createdAt', 'updatedAt');
      expect(body.data[1]).to.have.all.keys('uuid', 'name', 'description', 'price', 'categories', 'imageURL', 'createdAt', 'updatedAt');
    });
  });

  context('when there are no products', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/products')
        .expect(200);

      expect(body.data).to.have.lengthOf(0);
    });
  });
});
