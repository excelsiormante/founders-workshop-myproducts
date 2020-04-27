class ListProducts {
  constructor({ ProductRepository }) {
    this.ProductRepository = ProductRepository;
  }

  async execute(args = { limit: null, offset: null, order: [] }) {
    return this.ProductRepository.getAll({
      ...args,
      order: args.order.map((attr) => {
        const [ordering, property] = attr.split('(');
        return [
          property.substr(0, property.length - 1), ordering,
        ];
      }),
    });
  }
}

module.exports = ListProducts;
