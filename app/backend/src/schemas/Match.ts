import ILeaderboard from '../interfaces/Leaderboard';

function getVictory(goalsFavor: number, goalsOwn: number, team: string) {
  const results: ILeaderboard = {
    name: team,
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: 0 };
  return results;
}

function getTie(goalsFavor: number, goalsOwn: number, team: string) {
  const results: ILeaderboard = {
    name: team,
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: 0 };
  return results;
}

function getLoss(goalsFavor: number, goalsOwn: number, team: string) {
  const results: ILeaderboard = {
    name: team,
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: 0 };
  return results;
}

export { getVictory, getTie, getLoss };
