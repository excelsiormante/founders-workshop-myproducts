const { expect } = require('chai');
const CreateOffer = require('src/app/offer/CreateOffer');
const { ValidationError } = require('src/domain/error/errors').types;
const utils = require('src/interfaces/http/utils');

describe('App :: Offer :: CreateOffer', () => {
  let createOffer;

  context('when offer is valid', () => {
    before(() => {
      const MockOffersRepository = {
        add: (offer) => Promise.resolve(offer),
      };

      createOffer = new CreateOffer({
        OfferRepository: MockOffersRepository,
      });
    });

    it('creates the offer', async () => {
      const offerData = {
        name: 'New Offer',
        type: 'all',
        itemUUID: ['69fe54a4-1c74-4bae-95a7-48e84dde330c'],
        discount: 20,
      };

      const response = await createOffer.execute(offerData);
      expect(response.name).to.equal('New Offer');
    });
  });

  context('when offer is invalid', () => {
    before(() => {
      const MockOffersRepository = {
        add: (offer) => Promise.resolve(offer),
      };

      createOffer = new CreateOffer({
        OfferRepository: MockOffersRepository,
        utils,
      });
    });

    it('throws an error of type "ValidationError"', async () => {
      const offerData = {}; // property "name" is required, therefore invalid

      try {
        await createOffer.execute(offerData);
      } catch (err) {
        expect(err.name).to.equal(ValidationError);
        expect(err.message).to.equal('Validation Error');
        expect(err.details).lengthOf(4);
        expect(err.details[0].message).to.equal('"name" is required');
      }
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockOffersRepository = {
        add: () => Promise.reject(new Error('Some Error')),
      };

      createOffer = new CreateOffer({
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
        await createOffer.execute(offerData);
      } catch (err) {
        expect(err.message).to.equal('Some Error');
      }
    });
  });
});
