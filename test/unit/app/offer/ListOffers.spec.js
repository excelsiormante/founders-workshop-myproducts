const { expect } = require('chai');
const ListOffers = require('src/app/offer/ListOffers');

describe('App :: Offer :: ListOffers', () => {
  let listOffers;

  context('when query is successful', () => {
    before(() => {
      const MockOffersRepository = {
        getAll: () => Promise.resolve('some offers....'),
      };

      listOffers = new ListOffers({
        OfferRepository: MockOffersRepository,
      });
    });

    it('returns a promise that returns offers when resolved', (done) => {
      const response = listOffers.execute();
      expect(response).to.be.a('promise');
      done();
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockOffersRepository = {
        getAll: () => Promise.reject(new Error('Failed')),
      };

      listOffers = new ListOffers({
        OfferRepository: MockOffersRepository,
      });
    });

    it('throws the error', async () => {
      try {
        await listOffers.execute();
      } catch (error) {
        expect(error.message).to.equal('Failed');
      }
    });
  });
});
