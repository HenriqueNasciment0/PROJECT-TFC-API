import Teams from '../database/models/team';
import Matches from '../database/models/match';
import { IMatch } from '../interfaces/IMatch';
import CustomError from '../utils/CustomError';

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

    if (match.homeTeam === match.awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }

    return newMatch;
  }

  static async patchInProgressFalse(id: string) {
    const match = await Matches.update({ inProgress: false }, { where: { id } });

    return match;
  }
}
