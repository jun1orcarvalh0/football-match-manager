import Team from '../interfaces/ITeam';
import TeamsModel from '../database/models/TeamsModel';

class TeamsService {
  public findAll = async (): Promise<Team[]> => {
    const teams = await TeamsModel.findAll();
    return teams;
  };

  public findByPk = async (id: number): Promise<Team | null> => {
    const team = await TeamsModel.findByPk(id);

    if (!team) return null;

    return team;
  };
}

export default new TeamsService();
