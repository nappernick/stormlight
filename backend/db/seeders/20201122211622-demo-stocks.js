'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Stocks', [
      {
        ticker: "AAPL",
        buyPrice: 117.34,
        numStock: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ticker: "SNAP",
        buyPrice: 44.31,
        numStock: 8,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ticker: "TWTR",
        buyPrice: 44.69,
        numStock: 6,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ticker: "TSLA",
        buyPrice: 490.4,
        numStock: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ticker: "GE",
        buyPrice: 9.73,
        numStock: 13,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stocks', {
      userId: 1
    }, {});
  }
};
