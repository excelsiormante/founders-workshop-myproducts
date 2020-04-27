const { expect } = require('chai');
const ListCategories = require('src/app/category/ListCategories');

describe('App :: Category :: ListCategories', () => {
  let listCategories;

  context('when query is successful', () => {
    before(() => {
      const MockCategoriesRepository = {
        getAll: () => Promise.resolve('some categories....'),
      };

      listCategories = new ListCategories({
        CategoryRepository: MockCategoriesRepository,
      });
    });

    it('returns a promise that returns categories when resolved', (done) => {
      const response = listCategories.execute();
      expect(response).to.be.a('promise');
      done();
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockCategoriesRepository = {
        getAll: () => Promise.reject(new Error('Failed')),
      };

      listCategories = new ListCategories({
        CategoryRepository: MockCategoriesRepository,
      });
    });

    it('throws the error', async () => {
      try {
        await listCategories.execute();
      } catch (error) {
        expect(error.message).to.equal('Failed');
      }
    });
  });
});
