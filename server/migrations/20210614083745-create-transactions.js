'use strict';

const { sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      asset_id: {
        type: Sequelize.INTEGER,
      },
      owner_id: {
        type: Sequelize.INTEGER,
      },
      renter_id: {
        type: Sequelize.INTEGER,
      },
      started_at: {
        type: Sequelize.DATE,
      },
      ended_at: {
        type: Sequelize.DATE,
      },
      comments: {
        type: Sequelize.STRING,
      },
      owner_approvement: {
        type: Sequelize.BOOLEAN,
      },
      booked: {
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
    await queryInterface.dropTable('Transactions');
  },
};
