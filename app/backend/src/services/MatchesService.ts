import Teams from '../database/models/team';
import Matches from '../database/models/match';
import { IMatch } from '../interfaces/IMatch';

export default class MatchesService {
  static async getAll(): Promise<Matches[]> {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  static async create(match: IMatch) {
    const newMatch = await Matches.create({ ...match, inProgress: true });

    return newMatch;
  }

  static async patchInProgressFalse(id: string) {
    const match = await Matches.update({ inProgress: false }, { where: { id } });

    return match;
  }
}
