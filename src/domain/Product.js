/* eslint-disable max-classes-per-file */
const { attributes } = require('structure');
const { Category } = require('./Category');

const definition = {
  name: {
    type: String,
    required: true,
    empty: false,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
};


const Product = attributes({
  uuid: {
    type: String,
    guid: {
      version: ['uuidv4'],
    },
  },
  categories: {
    type: Array,
    itemType: Category,
  },
  imageURL: {
    type: String,
  },
  ...definition,
  createdAt: Date,
  updatedAt: Date,
})(class Product { });

const NewProduct = attributes({
  ...definition,
  image: {
    type: String,
  },
  categories: {
    type: Array,
    itemType: String,
  },
})(class NewProduct {

});


module.exports = { NewProduct, Product };
