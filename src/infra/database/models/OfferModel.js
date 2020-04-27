
module.exports = (sequelize, DataTypes) => {
  const OfferModel = sequelize.define(
    'offers',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      itemUUID: {
        type: DataTypes.ARRAY(DataTypes.UUID),
      },
      discount: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: 'offers',
      timestamps: true,
    },
  );


  return OfferModel;
};
