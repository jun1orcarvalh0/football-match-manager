// import Match from '../interfaces/IMatch';
// import Team from '../interfaces/ITeam';
import Match from '../interfaces/IMatch';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { leaderboardTeam } from '../interfaces/ITeam';
// import teamsService from './teams.service';

class LeaderboardsService {
  public getLeaderboardHome = async () => {
    const teams = await TeamsModel.findAll();
    const data = await this.homeTeamMatches();
    const leaderboardHome = data.map((team, index) => ({
      name: teams[index].teamName,
      totalPoints: this.totalPoints(team as unknown as Match[]),
      totalGames: team.length,
      totalVictories: this.totalVictories(team as unknown as Match[]),
      totalDraws: this.totalDraws(team as unknown as Match[]),
      totalLosses: this.totalLosses(team as unknown as Match[]),
      goalsFavor: this.goalsFavor(team as unknown as Match[]),
      goalsOwn: this.goalsOwn(team as unknown as Match[]),
      goalsBalance: this.goalsBalance(team as unknown as Match[]),
      efficiency: this.efficiency(team as unknown as Match[]),
    }));
    return this.sortLeaderboard(leaderboardHome);
  };

  public homeTeamMatches = async () => {
    const teams = await TeamsModel.findAll();
    const promises = teams.map((team) => this.findMatchesByTeamId(team.id));
    const homeTeamMatches = await Promise.all(promises);
    return homeTeamMatches;
  };

  public findMatchesByTeamId = async (id: number) => {
    const teamMatches = await MatchesModel.findAll({
      where: { inProgress: false, homeTeamId: id },
      attributes: { exclude: ['id', 'awayTeamId'] },
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } }],
    });
    return teamMatches;
  };

  public totalPoints = (team: Match[]) => {
    let points = 0;
    team.map((match: Match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        points += 3;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        points += 1;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        points += 0;
      }
      return points;
    });
    return points;
  };

  public totalVictories = (team: Match[]) => {
    let victories = 0;
    team.map((match: Match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        victories += 1;
      }
      return victories;
    });
    return victories;
  };

  public totalDraws = (team: Match[]) => {
    let draws = 0;
    team.map((match: Match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        draws += 1;
      }
      return draws;
    });
    return draws;
  };

  public totalLosses = (team: Match[]) => {
    let losses = 0;
    team.map((match: Match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        losses += 1;
      }
      return losses;
    });
    return losses;
  };

  public goalsFavor = (team: Match[]) => {
    let goals = 0;
    team.map((match: Match) => {
      goals += match.homeTeamGoals;
      return goals;
    });
    return goals;
  };

  public goalsOwn = (team: Match[]) => {
    let goals = 0;
    team.map((match: Match) => {
      goals += match.awayTeamGoals;
      return goals;
    });
    return goals;
  };

  public goalsBalance = (team: Match[]) => this.goalsFavor(
    team as unknown as Match[],
  ) - this.goalsOwn(team as unknown as Match[]);

  public efficiency = (team: Match[]) => {
    const totalPoints = this.totalPoints(team as unknown as Match[]);
    const effiency = (totalPoints / (team.length * 3)) * 100;
    return Number(effiency.toFixed(2));
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
