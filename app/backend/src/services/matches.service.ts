import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import Match, { updateMatch } from '../interfaces/IMatch';

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

  public insertNewMatch = async (match: Match) => {
    const includesInProgress = { ...match, inProgress: true };
    const result = MatchesModel.create(includesInProgress);
    return result;
  };

  public updateStatus = async (id: number): Promise<true | null> => {
    const matchFound = await MatchesModel.findByPk(id);

    if (!matchFound?.inProgress) {
      return null;
    }

    matchFound.update({ inProgress: false });

    await matchFound?.save();

    return true;
  };

  public updateMatch = async (id:number, matchToBeUpdated: updateMatch) => {
    const matchFound = await MatchesModel.findByPk(id);

    matchFound?.update(matchToBeUpdated);

    await matchFound?.save();
  };
}

export default new MatchesService();
