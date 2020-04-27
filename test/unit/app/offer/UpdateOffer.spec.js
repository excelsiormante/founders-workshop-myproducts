const { expect } = require('chai');
const UpdateOffer = require('src/app/offer/UpdateOffer');
const utils = require('src/interfaces/http/utils');

describe('App :: Offer :: UpdateOffer', () => {
  let updateOffer;

  context('when offer exists', () => {
    context('when data is valid', () => {
      before(() => {
        const MockOffersRepository = {
          update: (id, data) => Promise.resolve(data),
        };

        updateOffer = new UpdateOffer({
          OfferRepository: MockOffersRepository,
          utils,
        });
      });

      it('returns a Promise with the updated offer upon resolve', async () => {
        const offerData = {
          name: 'Updated Offer',
          type: 'all',
          itemUUID: ['69fe54a4-1c74-4bae-95a7-48e84dde330c'],
          discount: 20,
        };

        const response = updateOffer.execute('69fe54a4-1c74-4bae-95a7-48e84dde330c', offerData);
        expect(response).to.be.a('promise');
        const result = await response;
        expect(result.name).to.equal('Updated Offer');
      });
    });

    context('when data is invalid', () => {
      before(() => {
        const MockOffersRepository = {
          update: () => {
            const error = new Error('Validation Error');
            error.name = 'ValidationError';
            return Promise.reject(error);
          },
        };

        updateOffer = new UpdateOffer({
          OfferRepository: MockOffersRepository,
          utils,
        });
      });

      it('throws a ValidationError', async () => {
        const offerData = {};
        try {
          await updateOffer.execute(1, offerData);
        } catch (error) {
          expect(error.name).to.equal('ValidationError');
        }
      });
    });
  });

  context('when the offer does not exist', () => {
    before(() => {
      const MockOffersRepository = {
        update: () => {
          const error = new Error('Not Found');
          error.name = 'NotFound';
          return Promise.reject(error);
        },
      };

      updateOffer = new UpdateOffer({
        OfferRepository: MockOffersRepository,
        utils,
      });
    });

    it('throws a NotFound error', async () => {
      const offerData = {
        name: 'New Offer',
        type: 'all',
        itemUUID: ['69fe54a4-1c74-4bae-95a7-48e84dde330c'],
        discount: 20,
      };

      try {
        await updateOffer.execute('69fe54a4-1c74-4bae-95a7-48e84dde330c', offerData);
      } catch (error) {
        expect(error.name).to.equal('NotFound');
      }
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockOffersRepository = {
        update: () => Promise.reject(new Error('Some Error')),
      };

      updateOffer = new UpdateOffer({
        OfferRepository: MockOffersRepository,
        utils,
      });
    });

    it('throws the error', async () => {
      const offerData = {
        name: 'New Offer',
        type: 'all',
        itemUUID: ['69fe54a4-1c74-4bae-95a7-48e84dde330c'],
        discount: 20,
      };

      try {
        await updateOffer.execute(1, offerData);
      } catch (error) {
        expect(error.message).to.equal('Some Error');
      }
    });
  });
});
