const BaseRepository = require('./BaseRepository');

class CategoryRepository extends BaseRepository {
  constructor({ CategoryModel }) {
    super(CategoryModel);
  }
}

module.exports = CategoryRepository;
