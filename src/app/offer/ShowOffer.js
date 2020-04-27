
class ShowOffer {
  constructor({ OfferRepository }) {
    this.OfferRepository = OfferRepository;
  }

  async execute(id) {
    return this.OfferRepository.getById(id);
  }
}
module.exports = ShowOffer;
