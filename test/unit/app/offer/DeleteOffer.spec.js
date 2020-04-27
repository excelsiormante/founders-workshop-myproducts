const { expect } = require('chai');
const DeleteOffer = require('src/app/offer/DeleteOffer');

describe('App :: Offer :: DeleteOffer', () => {
  let deleteOffer;

  context('when offer exists', () => {
    before(() => {
      const MockOffersRepository = {
        remove: () => Promise.resolve(),
      };

      deleteOffer = new DeleteOffer({
        OfferRepository: MockOffersRepository,
      });
    });

    it('returns a promise that deletes the offer when resolved', async () => {
      const response = deleteOffer.execute();
      expect(response).to.be.a('promise');
    });
  });

  context('when the offer does not exist', () => {
    before(() => {
      const MockOffersRepository = {
        remove: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      deleteOffer = new DeleteOffer({
        OfferRepository: MockOffersRepository,
      });
    });

    it('throws a NotFound error', async () => {
      try {
        await deleteOffer.execute(1);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockOffersRepository = {
        remove: () => Promise.reject(new Error('Some Error')),
      };

      deleteOffer = new DeleteOffer({
        OfferRepository: MockOffersRepository,
      });
    });

    it('throws the error', async () => {
      try {
        await deleteOffer.execute(1);
      } catch (err) {
        expect(err.message).to.equal('Some Error');
      }
    });
  });
});
