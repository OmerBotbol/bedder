'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      owner_id: {
        type: Sequelize.INTEGER,
      },
      city: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      room_type: {
        type: Sequelize.STRING,
      },
      Hospitality: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      number_of_peoples: {
        type: Sequelize.INTEGER,
      },
      number_of_rooms: {
        type: Sequelize.INTEGER,
      },
      kosher: {
        type: Sequelize.BOOLEAN,
      },
      shabat: {
        type: Sequelize.BOOLEAN,
      },
      parking: {
        type: Sequelize.BOOLEAN,
      },
      animals: {
        type: Sequelize.BOOLEAN,
      },
      ac: {
        type: Sequelize.BOOLEAN,
      },
      accessibility: {
        type: Sequelize.BOOLEAN,
      },
      babies: {
        type: Sequelize.BOOLEAN,
      },
      picture: {
        type: Sequelize.STRING,
      },
      started_at: {
        type: Sequelize.DATE,
      },
      ended_at: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Assets');
  },
};
