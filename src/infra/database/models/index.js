const Sequelize = require('sequelize');
const config = require('config').db;
const fs = require('fs');
const path = require('path');
const inflection = require('inflection');

const singularizeToUpper = (str) => inflection.singularize(str.replace(/^./, (f) => f.toUpperCase()));

const load = ({ sequelize, baseFolder, indexFile = 'index.js' }) => {
  const loaded = {
    models: {},
  };

  fs.readdirSync(baseFolder)
    .filter((file) => (
      file.indexOf('.') !== 0
      && file !== indexFile
      && file.slice(-3) === '.js'
    ))
    .forEach((file) => {
      const model = sequelize.import(path.join(baseFolder, file));
      const modelName = `${singularizeToUpper(file.split('.')[0])}`;
      loaded.models[modelName] = model;
    });

  Object.keys(loaded.models).forEach((modelName) => {
    if (loaded.models[modelName].associate) {
      loaded.models[modelName].associate(loaded);
    }
  });
  loaded.database = sequelize;
  return loaded;
};


if (config) {
  const sequelize = new Sequelize(config);
  const { models, database } = load({
    sequelize,
    baseFolder: __dirname,
  });

  module.exports = {
    sequelize,
    models,
    database,
  };
} else {
  /* eslint-disable no-console */
  console.error('Database config file not found, disabling database.');
  /* eslint-enable no-console */
}
