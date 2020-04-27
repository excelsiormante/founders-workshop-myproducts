class DeleteCategory {
  constructor({ CategoryRepository }) {
    this.CategoryRepository = CategoryRepository;
  }

  async execute(id) {
    return this.CategoryRepository.remove(id);
  }
}

module.exports = DeleteCategory;
