'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Watchlists', [
      {
        ticker: "XONE",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ticker: "LIZI",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ticker: "TLRY",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Watchlists', {
      userId: 1
    }, {});
  }
};
