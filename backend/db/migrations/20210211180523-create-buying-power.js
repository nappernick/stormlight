'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BuyingPowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dollars: {
        defaultValue: 100000.00,
        type: Sequelize.DECIMAL(10, 2)
      },
      userId: {
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BuyingPowers');
  }
};
