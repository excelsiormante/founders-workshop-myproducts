const { NewOffer } = require('src/domain/Offer');
const { ValidationError } = require('src/domain/error/errors').types;

class UpdateOffer {
  constructor({ OfferRepository, utils }) {
    this.OfferRepository = OfferRepository;
    this.utils = utils;
  }

  async execute(id, data) {
    const newOffer = new NewOffer(data);
    const { valid, errors } = newOffer.validate();
    if (!valid) {
      throw new this.utils.ErrorBuilder(ValidationError, 'Validation Error', errors);
    }

    return this.OfferRepository.update(id, newOffer.toJSON());
  }
}


module.exports = UpdateOffer;
