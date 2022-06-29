import Match from '../services/Match';
import Team from '../services/Team';
import ILeaderboard from '../interfaces/Leaderboard';
import SLeaderboardHome from './LeaderboardHome';
import SLeaderboardAway from './LeaderboardAway';

export default class LeaderboardAway {
  constructor(
    public sMatch = new Match(),
    public sTeam = new Team(),
    public sHome = new SLeaderboardHome(),
    public sAway = new SLeaderboardAway(),
  ) { }

  public async getAll() {
    const findTeams = await this.sTeam.getAll();
    const findMatches = findTeams.map(async ({ teamName, id }) => {
      const homeBoard = await this.sMatch.getLeaderboardHomeMatches(id);
      const awayBoard = await this.sMatch.getLeaderboardAwayMatches(id);

      const getHomeBoard = SLeaderboardHome.getBoard(teamName, homeBoard);
      const getAwayBoard = SLeaderboardAway.getBoard(teamName, awayBoard);

      const board = [getHomeBoard, getAwayBoard];
      return LeaderboardAway.getBoard(teamName, board);
    });
    const setBoard = await Promise.all(findMatches);
    return setBoard;
  }

  static getVictories(matches: ILeaderboard[]) {
    const getVictories = matches.reduce((acc, match) => (
      acc + match.totalVictories
    ), 0);

    return { totalVictories: getVictories };
  }

  static getDraws(matches: ILeaderboard[]) {
    const getDraws = matches.reduce((acc, match) => (
      acc + match.totalDraws
    ), 0);

    return { totalDraws: getDraws };
  }

  static getLosses(matches: ILeaderboard[]) {
    const getLosses = matches.reduce((acc, match) => (
      acc + match.totalLosses
    ), 0);

    return { totalLosses: getLosses };
  }

  static getGoals(matches: ILeaderboard[]) {
    const getFavorGoals = matches.reduce((acc, match) => (
      acc + match.goalsFavor
    ), 0);

    const getOwnGoals = matches.reduce((acc, match) => (
      acc + match.goalsOwn
    ), 0);

    const getGoalsBalance = getFavorGoals - getOwnGoals;

    return { goalsFavor: getFavorGoals, goalsOwn: getOwnGoals, goalsBalance: getGoalsBalance };
  }

  static getBoard(teamName: string, matches: ILeaderboard[]) {
    const victories = this.getVictories(matches);
    const ties = this.getDraws(matches);
    const losses = this.getLosses(matches);
    const points = (victories.totalVictories * 3) + ties.totalDraws;
    const games = (victories.totalVictories + losses.totalLosses + ties.totalDraws);
    const goals = this.getGoals(matches);
    // Referência para arredondar o número para 2 casas decimais:
    // https://metring.com.br/arredondar-numero-em-javascript#:~:text=Para%20arredondar%20um%20n%C3%BAmero%20decimal,n%C3%A3o%20%C3%A9%20um%20m%C3%A9todo%20confi%C3%A1vel.
    const efficiency = +(parseFloat(((points / (games * 3)) * 100).toString()).toFixed(2));

    return {
      name: teamName,
      totalPoints: points,
      totalGames: games,
      ...victories,
      ...ties,
      ...losses,
      ...goals,
      efficiency,
    } as ILeaderboard;
  }
}
