class ListOffers {
  constructor({ OfferRepository }) {
    this.OfferRepository = OfferRepository;
  }

  async execute(args = { limit: null, offset: null, itemUUID: [] }) {
    return this.OfferRepository.getAll(args);
  }
}

module.exports = ListOffers;
