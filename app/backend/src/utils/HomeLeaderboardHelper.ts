import Match from '../interfaces/IMatch';

class HomeLeaderboardHelper {
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
}

export default new HomeLeaderboardHelper();
