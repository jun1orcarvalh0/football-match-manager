import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

export default class MatchesController {
  public getAll = async (req: Request, res: Response) => {
    if (!req.query.inProgress) {
      const matches = await matchesService.findAll();
      return res.status(200).json(matches);
    }

    if (req.query.inProgress === 'true') {
      const matches = await matchesService.findByFilter(true);
      return res.status(200).json(matches);
    }

    if (req.query.inProgress === 'false') {
      const matches = await matchesService.findByFilter(false);
      return res.status(200).json(matches);
    }
  };
}
