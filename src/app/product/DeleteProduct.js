class DeleteProduct {
  constructor({ ProductRepository }) {
    this.ProductRepository = ProductRepository;
  }

  async execute(id) {
    return this.ProductRepository.remove(id);
  }
}

module.exports = DeleteProduct;
