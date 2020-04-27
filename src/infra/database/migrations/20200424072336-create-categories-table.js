
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('categories',
    {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,
    }),

  down: (queryInterface) => queryInterface.dropTable('categories'),


};
