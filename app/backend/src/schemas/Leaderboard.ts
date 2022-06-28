import ILeaderboard from '../interfaces/Leaderboard';

export default function generateResult(a: ILeaderboard, b: ILeaderboard) {
  return {
    name: b.name,
    totalPoints: a.totalPoints + b.totalPoints,
    totalGames: a.totalGames + b.totalGames,
    totalVictories: a.totalVictories + b.totalVictories,
    totalDraws: a.totalDraws + b.totalDraws,
    totalLosses: a.totalLosses + b.totalLosses,
    goalsFavor: a.goalsFavor + b.goalsFavor,
    goalsOwn: a.goalsOwn + b.goalsOwn,
    goalsBalance: a.goalsBalance + b.goalsBalance,
    efficiency: ((a.totalPoints + b.totalPoints) / ((a.totalGames + b.totalGames) * 100)),
  };
}
