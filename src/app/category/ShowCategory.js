
class ShowCategory {
  constructor({ CategoryRepository }) {
    this.CategoryRepository = CategoryRepository;
  }

  async execute(id) {
    return this.CategoryRepository.getById(id);
  }
}
module.exports = ShowCategory;
