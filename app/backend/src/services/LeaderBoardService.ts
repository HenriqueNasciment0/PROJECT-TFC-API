import LeaderBoardHome from '../utils/LBHome';
import Matches from '../database/models/match';
import Teams from '../database/models/team';
import IHomeTeam from '../interfaces/IHomeTeam';

export default class LeaderBoardService {
  static async getAll() {
    const teams = await Teams.findAll(({
      include: [{ model: Matches, as: 'homeMatches', where: { inProgress: false } }],
    })) as IHomeTeam[];

    const leaderBoard = teams.map(({ teamName, homeMatches }) => {
      const useParamsInLB = LeaderBoardHome.leaderBoard(teamName, homeMatches);
      return useParamsInLB;
    });

    const orderLB = LeaderBoardHome.sortLeaderBoard(leaderBoard);

    return orderLB;
  }
}
