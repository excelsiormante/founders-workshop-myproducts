const { expect } = require('chai');
const ShowCategory = require('src/app/category/ShowCategory');

describe('App :: Category :: ShowCategory', () => {
  let showCategory;

  context('when category exists', () => {
    beforeEach(() => {
      const MockCategoriesRepository = {
        getById: (categoryId) => Promise.resolve({
          id: categoryId,
          name: 'The Category',
        }),
      };

      showCategory = new ShowCategory({
        CategoryRepository: MockCategoriesRepository,
      });
    });

    it('returns a promise with the category when resolved', (done) => {
      const response = showCategory.execute(1);
      expect(response).to.be.a('promise');
      response.then((category) => {
        expect(category.id).to.equal(1);
        expect(category.name).to.equal('The Category');
        done();
      });
    });
  });

  context('when category does not exist', () => {
    beforeEach(() => {
      const MockCategoriesRepository = {
        getById: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      showCategory = new ShowCategory({
        CategoryRepository: MockCategoriesRepository,
      });
    });

    it('throws a NotFoundError', async () => {
      try {
        await showCategory.execute(1);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });
});
