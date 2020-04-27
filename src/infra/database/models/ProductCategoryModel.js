module.exports = (sequelize, DataTypes) => {
  const ProductCategoryModel = sequelize.define(
    'productCategories',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
      },
      categoryId: {
        type: DataTypes.UUID,
      },
    },
    {
      tableName: 'productCategories',
      timestamps: true,
    },
  );

  return ProductCategoryModel;
};
