import TeamModel from '../database/models/Team';
import ITeam from '../interfaces/Team';

export default class Team {
  public findTeams: ITeam[];
  public findTeam: ITeam | null;

  public async getAll() {
    this.findTeams = await TeamModel.findAll();

    return this.findTeams;
  }

  public async getById(id: number) {
    this.findTeam = await TeamModel.findByPk(id);

    if (!this.findTeam) throw new Error('invalid pk');

    return this.findTeam;
  }
}
