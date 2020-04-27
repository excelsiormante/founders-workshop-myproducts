const path = require('path');
const { factory, SequelizeAdapter } = require('factory-girl');
const { models } = require('src/infra/database/models');
const { FactoriesLoader } = require('./factoryGirl');

const factoryGirl = new factory.FactoryGirl();
factoryGirl.setAdapter(new SequelizeAdapter());

module.exports = FactoriesLoader.load({
  factoryGirl,
  models,
  baseFolder: path.join(__dirname, 'factories'),
});
