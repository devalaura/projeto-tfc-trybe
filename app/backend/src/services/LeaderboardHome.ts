import LeaderboardSchema from '../schemas/LeaderboardHome';

export default class LeaderboardHome {
  constructor(public schema = new LeaderboardSchema()) { }

  public async getAll() {
    const leaderboard = await this.schema.getAll();

    return leaderboard.sort((a, b) => (b.totalPoints - a.totalPoints));
  }
}
