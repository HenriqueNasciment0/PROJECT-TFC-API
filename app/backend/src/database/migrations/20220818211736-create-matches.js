'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      homeTeam: {
        type: DataTypes.INTEGER,
        field: 'home_team',
        foreignKey: true,
        references: { model: 'teams', key: 'id' },
        onUpdate: 'CASCADE',
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'home_team_goals',
      },
      awayTeam: {
        type: DataTypes.INTEGER,
        field: 'away_team',
        foreignKey: true,
        references: { model: 'teams', key: 'id' },
        onUpdate: 'CASCADE',
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.INTEGER,
        field: 'in_progress',
      },
    });

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};
