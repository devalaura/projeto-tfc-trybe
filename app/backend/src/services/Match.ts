import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import IMatch from '../interfaces/Match';
import ILeaderboard from '../interfaces/Leaderboard';
import { getVictory, getTie, getLoss } from '../schemas/Match';

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

  public async getById(id: number) {
    const findMatch = await MatchModel.findByPk(id);
    if (!findMatch) throw new Error('invalid id match');

    this.returnMatches = findMatch;
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
    const findHomeTeam = await TeamModel.findByPk(homeTeam);
    const findAwayTeam = await TeamModel.findByPk(awayTeam);
    if (!findHomeTeam || !findAwayTeam) throw new Error('no teams');

    const match = await MatchModel.create({
      homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true,
    });

    this.returnMatches = match;

    return this.returnMatches;
  }

  public async finishMatch(id: number) {
    const findMatch = await this.getById(id);
    if (findMatch.inProgress === false) throw new Error('match already finished');

    await MatchModel.update({ inProgress: false }, {
      where: {
        id,
      },
    });

    return 'Finished';
  }

  public async update(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const findMatch = await this.getById(id);
    if (findMatch.inProgress === false) throw new Error('match already finished');

    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, {
      where: {
        id,
      },
    });

    return 'Updated';
  }

  public async getScoreBoard() {
    let results: ILeaderboard;
    const findMatch = await this.getAll();
    const setResults = findMatch.map(({ homeTeamGoals, awayTeamGoals, teamHome, teamAway }) => {
      if (teamHome && teamAway && homeTeamGoals > awayTeamGoals) {
        const victory = getVictory(homeTeamGoals, awayTeamGoals, teamHome.teamName);
        const loss = getLoss(awayTeamGoals, homeTeamGoals, teamAway.teamName);
        results = { ...results, ...victory, ...loss };
      } if (teamAway && teamHome && homeTeamGoals < awayTeamGoals) {
        const loss = getLoss(homeTeamGoals, awayTeamGoals, teamHome.teamName);
        const victory = getVictory(awayTeamGoals, homeTeamGoals, teamAway.teamName);
        results = { ...results, ...victory, ...loss };
      } if (teamAway && teamHome && homeTeamGoals === awayTeamGoals) {
        const tieHome = getTie(homeTeamGoals, awayTeamGoals, teamHome.teamName);
        const tieAway = getTie(awayTeamGoals, homeTeamGoals, teamAway.teamName);
        results = { ...results, ...tieHome, ...tieAway };
      } return results;
    });
    return setResults;
  }
}
