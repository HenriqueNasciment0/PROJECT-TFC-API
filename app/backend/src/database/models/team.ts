import { Model, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  teamName: string;
}

Teams.init({
  teamName: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
