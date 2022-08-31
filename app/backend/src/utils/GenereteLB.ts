import ILBMatch from '../interfaces/ILBMatch';
import LeaderBoardAway from './LBAway';
import LeaderBoardHome from './LBHome';

export default class genereteLB {
  static efficiency(home: ILBMatch[], away: ILBMatch[]) {
    const points = LeaderBoardHome.totalPoints(home) + LeaderBoardAway.totalPoints(away);
    const matches = home.length + away.length;

    return ((points / (matches * 3)) * 100).toFixed(2);
  }

  static completeLB(name: string, home: ILBMatch[], away: ILBMatch[]) {
    return {
      name,
      totalPoints: LeaderBoardHome.totalPoints(home) + LeaderBoardAway.totalPoints(away),
      totalGames: home.length + away.length,
      totalVictories: LeaderBoardHome.totalVictories(home) + LeaderBoardAway.totalVictories(away),
      totalDraws: LeaderBoardHome.totalDraws(home) + LeaderBoardAway.totalDraws(away),
      totalLosses: LeaderBoardHome.totalLosses(home) + LeaderBoardAway.totalLosses(away),
      goalsFavor: LeaderBoardHome.goalsFavor(home) + LeaderBoardAway.goalsFavor(away),
      goalsOwn: LeaderBoardHome.goalsOwn(home) + LeaderBoardAway.goalsOwn(away),
      goalsBalance: LeaderBoardHome.goalsBalance(home) + LeaderBoardAway.goalsBalance(away),
      efficiency: genereteLB.efficiency(home, away),
    };
  }
}
