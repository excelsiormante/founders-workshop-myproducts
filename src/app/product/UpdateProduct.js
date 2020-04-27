const { NewProduct } = require('src/domain/Product');
const { ValidationError } = require('src/domain/error/errors').types;

class UpdateProduct {
  constructor({ ProductRepository, utils }) {
    this.ProductRepository = ProductRepository;
    this.utils = utils;
  }

  async execute(id, data) {
    let updatedProduct = new NewProduct(data);
    const { valid, errors } = updatedProduct.validate();
    if (!valid) {
      throw new this.utils.ErrorBuilder(ValidationError, 'Validation Error', errors);
    }

    updatedProduct = updatedProduct.toJSON();
    if (updatedProduct.image) {
      updatedProduct.imageURL = `${this.baseUrl}/${this.productPhotoPath}/${updatedProduct.image}`;
    }
    return this.ProductRepository.update(id, updatedProduct);
  }
}


module.exports = UpdateProduct;
