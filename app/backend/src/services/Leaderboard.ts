import LeaderboardHome from './LeaderboardHome';
import LeaderboardAway from './LeaderboardAway';

export default class Leaderboard {
  constructor(public sLHome = new LeaderboardHome(), public sLAway = new LeaderboardAway()) { }

  public async getAll() {
    const findBoardHome = await this.sLHome.getAll();
    const findBoardAway = await this.sLAway.getAll();

    const result = [...findBoardHome, ...findBoardAway];

    return result.sort((a, b) => ((b.totalPoints - a.totalPoints)
    || (b.totalVictories - a.totalVictories) || (b.goalsBalance - a.goalsBalance)
    || (b.goalsFavor - a.goalsFavor) || (a.goalsOwn - b.goalsOwn)));
  }
}
