'use strict';

import { Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('consultations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clinicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clinics',
          key: 'id',
        },
      },
      doctor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      patient: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      diagnosis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      medication: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fee: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('consultations');
  },
};
