import ILeaderboard from '../interfaces/ILeaderBoard';
import ILBMatch from '../interfaces/ILBMatch';

export default class LeaderBoardAway {
  static totalVictories(match: ILBMatch[]) {
    const teamWins = match.reduce((acc: number, curr: ILBMatch) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return teamWins;
  }

  static totalLosses(match: ILBMatch[]) {
    const teamLoses = match.reduce((acc: number, curr: ILBMatch) => {
      if (curr.awayTeamGoals < curr.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return teamLoses;
  }

  static totalDraws(match: ILBMatch[]) {
    const tiedMatchs = match.reduce((acc: number, curr: ILBMatch) => {
      if (curr.awayTeamGoals === curr.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return tiedMatchs;
  }

  static goalsFavor(match: ILBMatch[]) {
    const totalOfGoals = match.reduce((acc: number, curr: ILBMatch) => acc + curr.awayTeamGoals, 0);
    return totalOfGoals;
  }

  static goalsOwn(match: ILBMatch[]) {
    const totalOfGoals = match.reduce((acc: number, curr: ILBMatch) => acc + curr.homeTeamGoals, 0);
    return totalOfGoals;
  }

  static goalsBalance(match: ILBMatch[]) {
    const balance = LeaderBoardAway.goalsFavor(match) - LeaderBoardAway.goalsOwn(match);
    return balance;
  }

  static totalPoints(match: ILBMatch[]) {
    const pointsWins = LeaderBoardAway.totalVictories(match);
    const pointsDraws = LeaderBoardAway.totalDraws(match);

    return (pointsWins * 3) + pointsDraws;
  }

  static efficiency(match: ILBMatch[]) {
    const efficiencyTeam = Number(
      ((LeaderBoardAway.totalPoints(match) / (match.length * 3)) * 100).toFixed(2),
    );
    return efficiencyTeam;
  }

  static leaderBoard(name: string, match: ILBMatch[]) {
    return {
      name,
      totalPoints: LeaderBoardAway.totalPoints(match),
      totalGames: match.length,
      totalVictories: LeaderBoardAway.totalVictories(match),
      totalDraws: LeaderBoardAway.totalDraws(match),
      totalLosses: LeaderBoardAway.totalLosses(match),
      goalsFavor: LeaderBoardAway.goalsFavor(match),
      goalsOwn: LeaderBoardAway.goalsOwn(match),
      goalsBalance: LeaderBoardAway.goalsBalance(match),
      efficiency: LeaderBoardAway.efficiency(match),
    } as ILeaderboard;
  }
}
