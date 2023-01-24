import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

export default class MatchesController {
  public getAll = async (req: Request, res: Response) => {
    const matches = await matchesService.findAll();
    return res.status(200).json(matches);
  };
}
