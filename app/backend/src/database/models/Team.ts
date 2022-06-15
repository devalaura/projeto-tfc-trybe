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
  tableName: 'teams',
});

Team.hasMany(Match, {
  foreignKey: 'id',
  as: 'homeTeam',
});

Team.hasMany(Match, {
  foreignKey: 'id',
  as: 'awayTeam',
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeam',
  as: 'idHomeTeam',
});

Match.belongsTo(Team, {
  foreignKey: 'awayTeam',
  as: 'idAwayTeam',
});

export default Team;
