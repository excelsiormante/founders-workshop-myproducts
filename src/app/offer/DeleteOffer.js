class DeleteOffer {
  constructor({ OfferRepository }) {
    this.OfferRepository = OfferRepository;
  }

  async execute(id) {
    return this.OfferRepository.remove(id);
  }
}

module.exports = DeleteOffer;
