"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Approvement", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      owner_id: {
        type: Sequelize.INTEGER,
      },
      renter_id: {
        type: Sequelize.INTEGER,
      },
      asset_id: {
        type: Sequelize.INTEGER,
      },
      owner_approval: {
        type: Sequelize.BOOLEAN,
      },
      renter_approval: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Approvement");
  },
};
