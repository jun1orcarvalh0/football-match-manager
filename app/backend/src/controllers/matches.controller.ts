import { Request, Response } from 'express';
import teamsService from '../services/teams.service';
import Match, { updateMatch } from '../interfaces/IMatch';
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

    const matches = await matchesService.findByFilter(false);
    return res.status(200).json(matches);
  };

  public createNewMatch = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

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

    const newMatch = await matchesService.insertNewMatch(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } as Match,
    );

    return res.status(201).json(newMatch);
  };

  public updateStatus = async (req: Request, res: Response) => {
    const { id } = req.params;

    const update = await matchesService.updateStatus(Number(id));

    if (update === null) {
      return res.status(401).json({ message: 'This match was not found' });
    }

    if (update === false) {
      return res.status(401).json({ message: 'This match was already finished' });
    }

    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    const update = await matchesService.updateMatch(Number(id), req.body as updateMatch);

    if (!update) {
      return res.status(404).json({ message: 'Match was not found' });
    }

    return res.status(200).json({ message: 'Match was updated' });
  };
}
