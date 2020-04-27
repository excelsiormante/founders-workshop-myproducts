const { Op } = require('sequelize');
const BaseRepository = require('./BaseRepository');

class OfferRepository extends BaseRepository {
  constructor({ OfferModel }) {
    super(OfferModel);
  }

  async getAll(args) {
    const results = await this.model.findAndCountAll({
      ...args,
      where: {
        itemUUID: {
          [Op.contains]: args.itemUUID,
        },
      },
    });

    return results;
  }
}

module.exports = OfferRepository;
