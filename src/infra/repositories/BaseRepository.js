const ErrorBuilder = require('src/interfaces/http/utils/ErrorBuilder');
const { NotFoundError } = require('src/domain/error/errors').types;

class BaseRepository {
  constructor(model, ToEntity = null, ToDatabase = null) {
    this.model = model;
    this.ToEntity = ToEntity;
    this.ToDatabase = ToDatabase;
  }

  async getAll(args) {
    const results = await this.model.findAndCountAll(args);

    if (this.toEntity) {
      results.rows = results.rows.map((result) => new this.ToEntity(result));
    }
    return results;
  }

  async getById(id, options = {}) {
    const result = await this._getById(id, options);

    if (this.toEntity) {
      return this.toEntity(result);
    }
    return result;
  }

  async add(data) {
    const result = await this.model.create(data);

    if (this.toEntity) {
      return this.toEntity(result);
    }
    return result;
  }

  async remove(id, options) {
    const entity = await this._getById(id);

    return entity.destroy(options);
  }

  async update(id, newData) {
    const entity = await this._getById(id);

    const transaction = await this.model.sequelize.transaction();

    try {
      const updatedEntity = await entity.update(newData, { transaction });

      await transaction.commit();

      if (this.toEntity) {
        return this.toEntity(updatedEntity);
      }
      return updatedEntity;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return this.model.count();
  }

  // Private

  async _getById(id, options = {}) {
    options.rejectOnEmpty = true;
    try {
      const result = await this.model.findByPk(id, options);
      return result;
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        throw new ErrorBuilder(NotFoundError, 'Not Found',
          `${this.model.name} with id ${id} can't be found.`);
      }

      throw error;
    }
  }
}

module.exports = BaseRepository;
