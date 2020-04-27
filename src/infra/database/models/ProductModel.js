module.exports = (sequelize, DataTypes) => {
  const ProductModel = sequelize.define(
    'products',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL,
      },
      imageURL: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'products',
      timestamps: true,
    },
  );

  ProductModel.associate = () => {
    ProductModel.belongsToMany(sequelize.models.categories, {
      through: sequelize.models.productCategories,
      foreignKey: 'productId',
      otherKey: 'categoryId',
      as: 'categories',
    });
  };


  return ProductModel;
};
