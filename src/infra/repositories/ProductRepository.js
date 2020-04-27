const BaseRepository = require('./BaseRepository');

class ProductRepository extends BaseRepository {
  constructor({ ProductModel, CategoryModel }) {
    super(ProductModel);
    this.CategoryModel = CategoryModel;
  }

  async getAll(args) {
    const results = await this.model.findAndCountAll({
      ...args,
      include: [{
        model: this.CategoryModel,
        as: 'categories',
        through: { attributes: [] },
      }],
    });
    return results;
  }


  async getById(id, options = {}) {
    const result = await this._getById(id, {
      include: [{
        model: this.CategoryModel,
        as: 'categories',
        through: { attributes: [] },
      }],
    });

    if (this.toEntity) {
      return this.toEntity(result);
    }
    return result;
  }

  async add(data) {
    const product = await this.model.create(data);
    await product.setCategories(data.categories);

    await product.reload({
      include: [{ model: this.CategoryModel, as: 'categories', through: { attributes: [] } }],
    });
    return product;
  }

  async update(id, newData) {
    const product = await this._getById(id);

    const transaction = await this.model.sequelize.transaction();

    try {
      const updatedProduct = await product.update(newData, { transaction });
      await updatedProduct.setCategories(newData.categories);
      await transaction.commit();

      if (this.toEntity) {
        return this.toEntity(updatedProduct);
      }
      await updatedProduct.reload({
        include: [{ model: this.CategoryModel, as: 'categories', through: { attributes: [] } }],
      });
      return updatedProduct;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }
}

module.exports = ProductRepository;
