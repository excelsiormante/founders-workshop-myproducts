const { Op } = require('sequelize');
const BaseRepository = require('./BaseRepository');

class OfferRepository extends BaseRepository {
  constructor({ OfferModel }) {
    super(OfferModel);
  }

  async getAll(args) {
    const results = await this.model.findAll({
      ...args,
      where: {
        itemUUID: {
          [Op.contains]: args.itemUUID,
        },
      },
    });

    if (this.toEntity) {
      return results.map((result) => new this.ToEntity(result));
    }
    return results;
  }
}

module.exports = OfferRepository;
