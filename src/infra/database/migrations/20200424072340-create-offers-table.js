
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('offers',
    {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      itemUUID: {
        type: Sequelize.ARRAY(Sequelize.UUID),
      },
      discount: {
        type: Sequelize.FLOAT,
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,
    }),

  down: (queryInterface) => queryInterface.dropTable('offers'),
};
