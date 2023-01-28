export default interface Team {
  'id': number,
  'teamName': string
}

export interface leaderboardTeam {
  'name': string,
  'totalPoints': number,
  'totalGames': number,
  'totalVictories': number,
  'totalDraws': number,
  'totalLosses': number,
  'goalsFavor': number,
  'goalsOwn': number,
  'goalsBalance': number,
  'efficiency': number
}
