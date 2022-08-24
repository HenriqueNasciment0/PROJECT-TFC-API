import Teams from '../database/models/team';

export default class TeamsService {
  static async getAll(): Promise<Teams[]> {
    const teams = await Teams.findAll();

    return teams;
  }
}
