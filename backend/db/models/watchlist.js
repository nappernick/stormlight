'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Watchlist.belongsTo(models.User, { foreignKey: "userId" })
    }
  };
  Watchlist.init({
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,  
      unique: 'uniqueWatchlistItem',
      validate: {
        len: {
          args: [0, 6],
          msg: "Must be a valid stock ticker."
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      unique: 'uniqueWatchlistItem'
    },
  }, {
    sequelize,
    modelName: 'Watchlist',
  });
  return Watchlist;
};
