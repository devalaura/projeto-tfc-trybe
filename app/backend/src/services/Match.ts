import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import IMatch from '../interfaces/Match';

export default class Match {
  public returnMatches: IMatch[] | IMatch;

  public async getAll() {
    const findMatches = await MatchModel.findAll({
      attributes: { exclude: ['home_team', 'away_team'] },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    this.returnMatches = findMatches;
    return this.returnMatches;
  }

  public async filterMatches(inProgress: boolean | undefined) {
    const findMatches = await MatchModel.findAll({
      where: {
        inProgress,
      },
      attributes: { exclude: ['home_team', 'away_team'] },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    this.returnMatches = findMatches;

    return this.returnMatches;
  }

  public async create(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const match = await MatchModel.create({
      homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true,
    });

    this.returnMatches = match;

    return this.returnMatches;
  }
}
