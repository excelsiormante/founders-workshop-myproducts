/* eslint-disable max-classes-per-file */
const { attributes } = require('structure');

const definition = {
  name: {
    type: String,
    required: true,
    empty: false,
  },
  type: {
    type: String,
    equal: ['category', 'product', 'all'],
    required: true,
  },
  itemUUID: {
    type: Array,
    itemType: {
      type: String,
      guid: {
        version: ['uuidv4'],
      },
    },
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
};


const Offer = attributes({
  uuid: {
    type: String,
    guid: {
      version: ['uuidv4'],
    },
  },
  ...definition,
  createdAt: Date,
  updatedAt: Date,
})(class Offer {
});

const NewOffer = attributes({
  ...definition,
})(class NewOffer {

});


module.exports = { NewOffer, Offer };
