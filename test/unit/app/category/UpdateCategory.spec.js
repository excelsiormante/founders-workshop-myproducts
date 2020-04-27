const { expect } = require('chai');
const UpdateCategory = require('src/app/category/UpdateCategory');
const utils = require('src/interfaces/http/utils');

describe('App :: Category :: UpdateCategory', () => {
  let updateCategory;

  context('when category exists', () => {
    context('when data is valid', () => {
      before(() => {
        const MockCategoriesRepository = {
          update: (id, data) => Promise.resolve(data),
        };

        updateCategory = new UpdateCategory({
          CategoryRepository: MockCategoriesRepository,
          utils,
        });
      });

      it('returns a Promise with the updated category upon resolve', (done) => {
        const categoryData = { name: 'Updated Category' };

        const response = updateCategory.execute(1, categoryData);
        expect(response).to.be.a('promise');
        response.then((category) => {
          expect(category.name).to.equal('Updated Category');
          done();
        });
      });
    });

    context('when data is invalid', () => {
      before(() => {
        const MockCategoriesRepository = {
          update: () => {
            const error = new Error('Validation Error');
            error.name = 'ValidationError';
            return Promise.reject(error);
          },
        };

        updateCategory = new UpdateCategory({
          CategoryRepository: MockCategoriesRepository,
          utils,
        });
      });

      it('throws a ValidationError', async () => {
        const categoryData = { name: 'New Category' };
        try {
          await updateCategory.execute(1, categoryData);
        } catch (error) {
          expect(error.name).to.equal('ValidationError');
        }
      });
    });
  });

  context('when the category does not exist', () => {
    before(() => {
      const MockCategoriesRepository = {
        update: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      updateCategory = new UpdateCategory({
        CategoryRepository: MockCategoriesRepository,
        utils,
      });
    });

    it('throws a NotFound error', async () => {
      const categoryData = { name: 'New Category' };

      try {
        await updateCategory.execute(1, categoryData);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockCategoriesRepository = {
        update: () => Promise.reject(new Error('Some Error')),
      };

      updateCategory = new UpdateCategory({
        CategoryRepository: MockCategoriesRepository,
        utils,
      });
    });

    it('throws the error', async () => {
      const categoryData = { name: 'New Category' };

      try {
        await updateCategory.execute(1, categoryData);
      } catch (error) {
        expect(error.message).to.equal('Some Error');
      }
    });
  });
});
