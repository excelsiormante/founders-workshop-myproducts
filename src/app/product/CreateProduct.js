const { NewProduct } = require('src/domain/Product');
const { ValidationError } = require('src/domain/error/errors').types;

class CreateProduct {
  constructor({
    ProductRepository, utils, config,
  }) {
    this.ProductRepository = ProductRepository;
    this.utils = utils;
    this.productPhotoPath = config.storage.productPhotoPath;
    this.baseUrl = config.web.baseUrl;
  }

  async execute(data) {
    let newProduct = new NewProduct(data);

    const { valid, errors } = newProduct.validate();
    if (!valid) {
      throw new this.utils.ErrorBuilder(ValidationError, 'Validation Error', errors);
    }

    newProduct = newProduct.toJSON();
    if (newProduct.image) {
      newProduct.imageURL = `${this.baseUrl}/${this.productPhotoPath}/${newProduct.image}`;
    }
    return this.ProductRepository.add(newProduct);
  }
}

module.exports = CreateProduct;
