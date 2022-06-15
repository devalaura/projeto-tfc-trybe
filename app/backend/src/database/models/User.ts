import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(30),
    allowNull: false,
  },
  role: {
    type: STRING(10),
    allowNull: false,
  },
  email: {
    type: STRING(40),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  tableName: 'users',
});

export default User;
