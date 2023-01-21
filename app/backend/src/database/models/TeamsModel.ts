import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matches from './MatchesModel';

class Teams extends Model {
  declare id:number;
  declare teamName:string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(100),
    allowNull: false,
  } }, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Teams.hasMany(Matches);
Matches.belongsTo(Teams);

export default Teams;
