import Match from './Match';
import Team from './Team';
import getResult from '../schemas/Leaderboard';

export default class Leaderboard {
  constructor(public sMatch = new Match(), public sTeam = new Team()) { }

  public async getAll() {
    const getMatches = await this.sMatch.getScoreBoard();
    const getTeams = await this.sTeam.getAll();
    const basicMatchReturn = getTeams.map((value) => ({
      name: value.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
    const getScore = getMatches.reduce((a, b) => (
      a.map((team) => (team.name === b.name ? getResult(team, b) : team))
    ), basicMatchReturn);
    return getScore;
  }
}
