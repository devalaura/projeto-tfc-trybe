import LeaderboardSchema from '../schemas/LeaderboardAway';

export default class LeaderboardAway {
  constructor(public schema = new LeaderboardSchema()) { }

  public async getAll() {
    const leaderboard = await this.schema.getAll();

    return leaderboard.sort((a, b) => ((b.totalPoints - a.totalPoints)
      || (b.totalVictories - a.totalVictories) || (b.goalsBalance - a.goalsBalance)
      || (b.goalsFavor - a.goalsFavor) || (a.goalsOwn - b.goalsOwn)));
  }
}
