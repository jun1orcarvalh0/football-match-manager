import { Request, Response } from 'express';
import teamsService from '../services/teams.service';
import Match from '../interfaces/IMatch';
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

  public createNewMatch = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId } = req.body;

    const checkingHomeTeamId = await teamsService.findByPk(homeTeamId);
    const checkingAwayTeamId = await teamsService.findByPk(awayTeamId);

    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    if (!checkingAwayTeamId || !checkingHomeTeamId) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const newMatch = await matchesService.insertNewMatch(req.body as Match);

    return res.status(201).json(newMatch);
  };

  public updateStatus = async (req: Request, res: Response) => {
    const { id } = req.params;

    await matchesService.updateStatus(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };
}
