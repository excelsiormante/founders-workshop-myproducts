const { expect } = require('chai');
const DeleteCategory = require('src/app/category/DeleteCategory');

describe('App :: Category :: DeleteCategory', () => {
  let deleteCategory;

  context('when category exists', () => {
    before(() => {
      const MockCategoriesRepository = {
        remove: () => Promise.resolve(),
      };

      deleteCategory = new DeleteCategory({
        CategoryRepository: MockCategoriesRepository,
      });
    });

    it('returns a promise that deletes the category when resolved', async () => {
      const response = deleteCategory.execute();
      expect(response).to.be.a('promise');
    });
  });

  context('when the category does not exist', () => {
    before(() => {
      const MockCategoriesRepository = {
        remove: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      deleteCategory = new DeleteCategory({
        CategoryRepository: MockCategoriesRepository,
      });
    });

    it('throws a NotFound error', async () => {
      try {
        await deleteCategory.execute(1);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockCategoriesRepository = {
        remove: () => Promise.reject(new Error('Some Error')),
      };

      deleteCategory = new DeleteCategory({
        CategoryRepository: MockCategoriesRepository,
      });
    });

    it('throws the error', async () => {
      try {
        await deleteCategory.execute(1);
      } catch (err) {
        expect(err.message).to.equal('Some Error');
      }
    });
  });
});
