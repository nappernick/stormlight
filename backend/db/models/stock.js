'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stock.belongsTo(models.User, { foreignKey: "userId" })
    }
  };
  Stock.init({
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 6],
          msg: "Must be a valid stock ticker."
        },
      },
    },
    buyPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    numStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};
