// import Match from '../interfaces/IMatch';
// import Team from '../interfaces/ITeam';
import Match from '../interfaces/IMatch';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { leaderboardTeam } from '../interfaces/ITeam';
import HomeLeaderboardHelper from '../utils/HomeLeaderboardHelper';
import AwayLeaderboardHelper from '../utils/AwayLeaderboardHelper';
import LeaderboardHelper from '../utils/LeaderboardHelper';

class LeaderboardsService {
  public getLeaderboardHome = async () => {
    const teams = await TeamsModel.findAll();
    const data = await this.homeTeamMatches();
    const leaderboardHome = data.map((team, index) => ({
      name: teams[index].teamName,
      totalPoints: HomeLeaderboardHelper.totalPoints(team as unknown as Match[]),
      totalGames: team.length,
      totalVictories: HomeLeaderboardHelper.totalVictories(team as unknown as Match[]),
      totalDraws: HomeLeaderboardHelper.totalDraws(team as unknown as Match[]),
      totalLosses: HomeLeaderboardHelper.totalLosses(team as unknown as Match[]),
      goalsFavor: HomeLeaderboardHelper.goalsFavor(team as unknown as Match[]),
      goalsOwn: HomeLeaderboardHelper.goalsOwn(team as unknown as Match[]),
      goalsBalance: HomeLeaderboardHelper.goalsBalance(team as unknown as Match[]),
      efficiency: HomeLeaderboardHelper.efficiency(team as unknown as Match[]),
    }));
    return this.sortLeaderboard(leaderboardHome);
  };

  public getLeaderboardAway = async () => {
    const teams = await TeamsModel.findAll();
    const data = await this.awayTeamMatches();
    const leaderboardAway = data.map((team, index) => ({
      name: teams[index].teamName,
      totalPoints: AwayLeaderboardHelper.totalPoints(team as unknown as Match[]),
      totalGames: team.length,
      totalVictories: AwayLeaderboardHelper.totalVictories(team as unknown as Match[]),
      totalDraws: AwayLeaderboardHelper.totalDraws(team as unknown as Match[]),
      totalLosses: AwayLeaderboardHelper.totalLosses(team as unknown as Match[]),
      goalsFavor: AwayLeaderboardHelper.goalsFavor(team as unknown as Match[]),
      goalsOwn: AwayLeaderboardHelper.goalsOwn(team as unknown as Match[]),
      goalsBalance: AwayLeaderboardHelper.goalsBalance(team as unknown as Match[]),
      efficiency: AwayLeaderboardHelper.efficiency(team as unknown as Match[]),
    }));
    return this.sortLeaderboard(leaderboardAway);
  };

  public getFullLeaderboard = async () => {
    const teams = await TeamsModel.findAll();
    const data = await this.homeAndAwayTeamMatches();
    // return data;
    const leaderboard = data.map((team, index) => ({
      name: teams[index].teamName,
      totalPoints: LeaderboardHelper.totalPoints(team as unknown as Match[]),
      totalGames: team.length,
      totalVictories: LeaderboardHelper.totalVictories(team as unknown as Match[]),
      totalDraws: LeaderboardHelper.totalDraws(team as unknown as Match[]),
      totalLosses: LeaderboardHelper.totalLosses(team as unknown as Match[]),
      goalsFavor: LeaderboardHelper.goalsFavor(team as unknown as Match[]),
      goalsOwn: LeaderboardHelper.goalsOwn(team as unknown as Match[]),
      goalsBalance: LeaderboardHelper.goalsBalance(team as unknown as Match[]),
      efficiency: LeaderboardHelper.efficiency(team as unknown as Match[]),
    }));
    return this.sortLeaderboard(leaderboard);
  };

  public homeTeamMatches = async () => {
    const teams = await TeamsModel.findAll();
    const promises = teams.map((team) => this.findHomeMatchesByTeamId(team.id));
    const homeTeamMatches = await Promise.all(promises);
    return homeTeamMatches;
  };

  public awayTeamMatches = async () => {
    const teams = await TeamsModel.findAll();
    const promises = teams.map((team) => this.findAwayMatchesByTeamId(team.id));
    const awayTeamMatches = await Promise.all(promises);
    return awayTeamMatches;
  };

  public homeAndAwayTeamMatches = async () => {
    const teams = await TeamsModel.findAll();
    const promises = teams.map((team) => this.findMatchesByTeamId(team.id));
    const teamMatches = await Promise.all(promises);
    return teamMatches;
  };

  public findHomeMatchesByTeamId = async (id: number) => {
    const teamMatches = await MatchesModel.findAll({
      where: { inProgress: false, homeTeamId: id },
      attributes: { exclude: ['id', 'awayTeamId'] },
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } }],
    });
    return teamMatches;
  };

  public findAwayMatchesByTeamId = async (id: number) => {
    const teamMatches = await MatchesModel.findAll({
      where: { inProgress: false, awayTeamId: id },
      attributes: { exclude: ['id', 'homeTeamId'] },
      include: [{ model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return teamMatches;
  };

  public findMatchesByTeamId = async (id: number) => {
    const awayTeamMatches = await MatchesModel.findAll({
      where: { inProgress: false, awayTeamId: id },
      attributes: { exclude: ['id', 'homeTeamId'] },
      include: [{ model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    const homeTeamMatches = await MatchesModel.findAll({
      where: { inProgress: false, homeTeamId: id },
      attributes: { exclude: ['id', 'awayTeamId'] },
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } }],
    });
    return [...awayTeamMatches, ...homeTeamMatches];
  };

  public sortLeaderboard = (teams: leaderboardTeam[]) => {
    teams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return b.goalsOwn - a.goalsOwn;
    });
    return teams;
  };
}

export default new LeaderboardsService();
