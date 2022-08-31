import ILeaderboard from '../interfaces/ILeaderBoard';
import ILBMatch from '../interfaces/ILBMatch';

export default class LeaderBoardHome {
  static totalVictories(match: ILBMatch[]) {
    const teamWins = match.reduce((acc: number, curr: ILBMatch) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return teamWins;
  }

  static totalLosses(match: ILBMatch[]) {
    const teamLoses = match.reduce((acc: number, curr: ILBMatch) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return teamLoses;
  }

  static totalDraws(match: ILBMatch[]) {
    const tiedMatchs = match.reduce((acc: number, curr: ILBMatch) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return tiedMatchs;
  }

  static goalsFavor(match: ILBMatch[]) {
    const totalOfGoals = match.reduce((acc: number, curr: ILBMatch) => acc + curr.homeTeamGoals, 0);
    return totalOfGoals;
  }

  static goalsOwn(match: ILBMatch[]) {
    const totalOfGoals = match.reduce((acc: number, curr: ILBMatch) => acc + curr.awayTeamGoals, 0);
    return totalOfGoals;
  }

  static goalsBalance(match: ILBMatch[]) {
    const balance = LeaderBoardHome.goalsFavor(match) - LeaderBoardHome.goalsOwn(match);
    return balance;
  }

  static totalPoints(match: ILBMatch[]) {
    const pointsWins = LeaderBoardHome.totalVictories(match);
    const pointsDraws = LeaderBoardHome.totalDraws(match);

    return (pointsWins * 3) + pointsDraws;
  }

  static efficiency(match: ILBMatch[]) {
    const efficiencyTeam = Number(
      ((LeaderBoardHome.totalPoints(match) / (match.length * 3)) * 100).toFixed(2),
    );
    return efficiencyTeam;
  }

  static sortLeaderBoard = (leaderBoard: ILeaderboard[]) => {
    const sortedLeaderboard = leaderBoard.sort((next, prev) =>
      prev.totalPoints - next.totalPoints
    || prev.totalVictories - next.totalVictories
    || prev.goalsBalance - next.goalsBalance
    || prev.goalsFavor - next.goalsFavor
    || prev.goalsOwn - next.goalsOwn);
    return sortedLeaderboard;
  };

  static leaderBoard(name: string, match: ILBMatch[]) {
    return {
      name,
      totalPoints: LeaderBoardHome.totalPoints(match),
      totalGames: match.length,
      totalVictories: LeaderBoardHome.totalVictories(match),
      totalDraws: LeaderBoardHome.totalDraws(match),
      totalLosses: LeaderBoardHome.totalLosses(match),
      goalsFavor: LeaderBoardHome.goalsFavor(match),
      goalsOwn: LeaderBoardHome.goalsOwn(match),
      goalsBalance: LeaderBoardHome.goalsBalance(match),
      efficiency: LeaderBoardHome.efficiency(match),
    };
  }
}
