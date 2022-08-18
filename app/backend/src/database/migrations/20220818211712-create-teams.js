'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teamName: {
        type: DataTypes.STRING,
        field: 'team_name',
      },
    });

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};
