const { NewCategory } = require('src/domain/Category');
const { ValidationError } = require('src/domain/error/errors').types;

class UpdateCategory {
  constructor({ CategoryRepository, utils }) {
    this.CategoryRepository = CategoryRepository;
    this.utils = utils;
  }

  async execute(id, data) {
    const newCategory = new NewCategory(data);
    const { valid, errors } = newCategory.validate();
    if (!valid) {
      throw new this.utils.ErrorBuilder(ValidationError, 'Validation Error', errors);
    }

    return this.CategoryRepository.update(id, data);
  }
}


module.exports = UpdateCategory;
