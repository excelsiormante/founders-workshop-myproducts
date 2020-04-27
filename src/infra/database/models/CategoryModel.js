module.exports = (sequelize, DataTypes) => {
  const CategoryModel = sequelize.define(
    'categories',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'categories',
      timestamps: true,
    },
  );

  CategoryModel.associate = () => {
    CategoryModel.belongsToMany(sequelize.models.products, {
      through: sequelize.models.productCategories,
      foreignKey: 'categoryId',
      otherKey: 'productId',
      as: 'products',
    });
  };


  return CategoryModel;
};
