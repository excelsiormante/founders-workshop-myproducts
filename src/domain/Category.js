/* eslint-disable max-classes-per-file */
const { attributes } = require('structure');

const definition = {
  name: {
    type: String,
    required: true,
    empty: false,
  },
};


const Category = attributes({
  uuid: {
    type: String,
    guid: {
      version: ['uuidv4'],
    },
  },
  ...definition,
  createdAt: Date,
  updatedAt: Date,
})(class Category {
});

const NewCategory = attributes({
  ...definition,
})(class NewCategory {

});


module.exports = { NewCategory, Category };
