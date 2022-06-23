import TeamModel from '../database/models/Team';
import ITeam from '../interfaces/Team';

export default class Team {
  public findTeams: ITeam[];

  public async getAll() {
    this.findTeams = await TeamModel.findAll();

    return this.findTeams;
  }
}
