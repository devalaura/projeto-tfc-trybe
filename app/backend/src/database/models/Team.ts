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

Team.hasMany(Match, { foreignKey: 'home_team', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'away_team', as: 'awayTeam' });

Match.belongsTo(Team, { foreignKey: 'home_team', targetKey: 'id', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'away_team', targetKey: 'id', as: 'teamAway' });

export default Team;
