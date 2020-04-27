const { expect } = require('chai');
const CreateCategory = require('src/app/category/CreateCategory');
const { ValidationError } = require('src/domain/error/errors').types;
const utils = require('src/interfaces/http/utils');

describe('App :: Category :: CreateCategory', () => {
  let createCategory;

  context('when category is valid', () => {
    before(() => {
      const MockCategoriesRepository = {
        add: (category) => Promise.resolve(category),
      };

      createCategory = new CreateCategory({
        CategoryRepository: MockCategoriesRepository,
      });
    });

    it('creates the category', async () => {
      const categoryData = { name: 'New Category' };

      const response = await createCategory.execute(categoryData);
      expect(response.name).to.equal('New Category');
    });
  });

  context('when category is invalid', () => {
    before(() => {
      const MockCategoriesRepository = {
        add: (category) => Promise.resolve(category),
      };

      createCategory = new CreateCategory({
        CategoryRepository: MockCategoriesRepository,
        utils,
      });
    });

    it('throws an error of type "ValidationError"', async () => {
      const categoryData = {}; // property "name" is required, therefore invalid

      try {
        await createCategory.execute(categoryData);
      } catch (err) {
        expect(err.name).to.equal(ValidationError);
        expect(err.message).to.equal('Validation Error');
        expect(err.details).lengthOf(1);
        expect(err.details[0].message).to.equal('"name" is required');
      }
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockCategoriesRepository = {
        add: () => Promise.reject(new Error('Some Error')),
      };

      createCategory = new CreateCategory({
        CategoryRepository: MockCategoriesRepository,
      });
    });

    it('throws the error', async () => {
      const categoryData = { name: 'New Category' };

      try {
        await createCategory.execute(categoryData);
      } catch (err) {
        expect(err.message).to.equal('Some Error');
      }
    });
  });
});
