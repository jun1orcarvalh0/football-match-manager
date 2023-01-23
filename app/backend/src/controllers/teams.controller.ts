import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

export default class TeamsController {
  public getAll = async (req: Request, res: Response) => {
    const teams = await teamsService.findAll();
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await teamsService.findByPk(Number(id));

    if (!team) {
      return res.status(404).json({ message: 'Time não encontrado' });
    }

    return res.status(200).json(team);
  };
}
