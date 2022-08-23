import { Model, INTEGER, STRING } from 'sequelize';
import { IUser } from '../../interfaces/IUser';
import db from '.';

class Users extends Model implements IUser {
  id!: number;
  username!: string;
  role!: number;
  email!: string;
  password!: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(100),
    allowNull: false,
  },
  role: {
    type: STRING(100),
    allowNull: false,
  },
  email: {
    type: STRING(100),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false });

export default Users;
