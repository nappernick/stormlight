'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuyingPower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BuyingPower.belongsTo(models.User, { foreignKey: "userId" })
    }
  };
  BuyingPower.init({
    dollars: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    userId: {
      unique: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'BuyingPower',
  });
  return BuyingPower;
};
