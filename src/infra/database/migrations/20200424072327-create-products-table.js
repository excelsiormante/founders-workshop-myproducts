
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('products',
    {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      imageURL: {
        type: Sequelize.STRING,
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,

    }),

  down: (queryInterface) => queryInterface.dropTable('products'),
};
