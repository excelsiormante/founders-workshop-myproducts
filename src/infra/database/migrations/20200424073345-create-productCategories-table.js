
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('productCategories',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: 'products',
          key: 'uuid',
          as: 'productId',
        },
        onDelete: 'cascade',
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'categories',
          key: 'uuid',
          as: 'categoryId',
        },
        onDelete: 'cascade',
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,
    }),

  down: (queryInterface) => queryInterface.dropTable('productCategories'),

};
