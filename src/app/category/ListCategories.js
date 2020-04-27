class ListCategories {
  constructor({ CategoryRepository }) {
    this.CategoryRepository = CategoryRepository;
  }

  async execute(args = { limit: null, offset: null }) {
    return this.CategoryRepository.getAll(args);
  }
}

module.exports = ListCategories;
