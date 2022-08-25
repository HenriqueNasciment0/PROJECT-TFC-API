import Teams from '../database/models/team';
import Matches from '../database/models/match';
import { IMatch } from '../interfaces/IMatch';
import CustomError from '../utils/CustomError';
import { IGoals } from '../interfaces/IGoals';

export default class MatchesService {
  //--------------------------------------------------------------------------

  static async getAll(): Promise<Matches[]> {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  //--------------------------------------------------------------------------

  static async create(match: IMatch) {
    if (match.homeTeam === match.awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }

    const allTeams = await Teams.findAll();
    const ids = allTeams.map((team) => team.id);

    if (!(ids.includes(match.homeTeam)) || !(ids.includes(match.awayTeam))) {
      throw new CustomError(404, 'There is no team with such id!');
    }

    const newMatch = await Matches.create({ ...match, inProgress: true });

    return newMatch;
  }

  //--------------------------------------------------------------------------

  static async patchInProgressFalse(id: string) {
    const match = await Matches.update({ inProgress: false }, { where: { id } });

    return match;
  }

  //--------------------------------------------------------------------------

  static async patchInProgressGoals(id: string, upGoals: IGoals) {
    const refreshGoals = await Matches
      .update({
        homeTeamGoals: upGoals.homeTeamGoals,
        awayTeamGoals: upGoals.awayTeamGoals,
      }, { where: { id } });

    return refreshGoals;
  }
}
