import { ITeams } from '../interfaces/ITeams';
import Teams from '../database/models/team';

export default class TeamsService {
  static async getAll(): Promise<Teams[]> {
    const teams = await Teams.findAll();

    return teams;
  }

  static async findById(id: string): Promise<ITeams> {
    const team = await Teams.findOne({ where: { id } });
    return team as ITeams;
  }
}
