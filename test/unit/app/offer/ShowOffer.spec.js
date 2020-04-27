const { expect } = require('chai');
const ShowOffer = require('src/app/offer/ShowOffer');

describe('App :: Offer :: ShowOffer', () => {
  let showOffer;

  context('when offer exists', () => {
    beforeEach(() => {
      const MockOffersRepository = {
        getById: (offerId) => Promise.resolve({
          id: offerId,
          name: 'The Offer',
        }),
      };

      showOffer = new ShowOffer({
        OfferRepository: MockOffersRepository,
      });
    });

    it('returns a promise with the offer when resolved', (done) => {
      const response = showOffer.execute(1);
      expect(response).to.be.a('promise');
      response.then((offer) => {
        expect(offer.id).to.equal(1);
        expect(offer.name).to.equal('The Offer');
        done();
      });
    });
  });

  context('when offer does not exist', () => {
    beforeEach(() => {
      const MockOffersRepository = {
        getById: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      showOffer = new ShowOffer({
        OfferRepository: MockOffersRepository,
      });
    });

    it('throws a NotFoundError', async () => {
      try {
        await showOffer.execute(1);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });
});
