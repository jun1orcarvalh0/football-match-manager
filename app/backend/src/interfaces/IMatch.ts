export default interface Match {
  'id?': number,
  'homeTeamId': number,
  'homeTeamGoals': number,
  'awayTeamId': number,
  'awayTeamGoals': number,
  'inProgress'?: boolean,
  'homeTeam'?: {
    'teamName': string
  },
  'awayTeam'?: {
    'teamName': string
  }
}

export interface updateMatch {
  'homeTeamGoals': number,
  'awayTeamGoals': number
}
