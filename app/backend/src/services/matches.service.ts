// import Match from '../interfaces/'
// import Match from '../interfaces/IMatch';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

class MatchesService {
  public findAll = async () => {
    const matches = await MatchesModel.findAll({
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return matches;
  };

  public findByFilter = async (bool: boolean) => {
    const matches = await MatchesModel.findAll({
      where: { inProgress: bool },
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return matches;
  };
}

export default new MatchesService();
