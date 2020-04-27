const { NewOffer } = require('src/domain/Offer');
const { ValidationError } = require('src/domain/error/errors').types;

class CreateOffer {
  constructor({ OfferRepository, utils }) {
    this.OfferRepository = OfferRepository;
    this.utils = utils;
  }

  async execute(data) {
    const newOffer = new NewOffer(data);

    const { valid, errors } = newOffer.validate();
    if (!valid) {
      throw new this.utils.ErrorBuilder(ValidationError, 'Validation Error', errors);
    }

    return this.OfferRepository.add(newOffer.toJSON());
  }
}

module.exports = CreateOffer;
