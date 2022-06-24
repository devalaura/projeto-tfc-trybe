import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

import Match from './Match';

class Team extends Model {
  public id!: number;
  public teamName!: string;
}

Team.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'teams',
  tableName: 'teams',
});

Team.hasMany(Match, { foreignKey: 'id' });

Match.belongsTo(Team);

export default Team;
