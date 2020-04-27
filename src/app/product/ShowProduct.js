
class ShowProduct {
  constructor({ ProductRepository }) {
    this.ProductRepository = ProductRepository;
  }

  async execute(id) {
    return this.ProductRepository.getById(id);
  }
}
module.exports = ShowProduct;
