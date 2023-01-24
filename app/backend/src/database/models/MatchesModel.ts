import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class Matches extends Model {
  declare id:number;
  declare homeTeamId:number;
  declare homeTeamGoals:number;
  declare awayTeamId:number;
  declare awayTeamGoals:number;
  declare inProgress:boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
  } }, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(TeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(TeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamsModel.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
TeamsModel.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
