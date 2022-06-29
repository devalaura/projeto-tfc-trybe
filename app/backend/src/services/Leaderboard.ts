import LeaderboardSchema from '../schemas/Leaderboard';

export default class Leaderboard {
  constructor(public schema = new LeaderboardSchema()) { }

  public async getAll() {
    const result = await this.schema.getAll();

    return result.sort((a, b) => ((b.totalPoints - a.totalPoints)
    || (b.totalVictories - a.totalVictories) || (b.goalsBalance - a.goalsBalance)
    || (b.goalsFavor - a.goalsFavor) || (a.goalsOwn - b.goalsOwn)));
  }
}
