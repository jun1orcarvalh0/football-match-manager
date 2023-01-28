import { Request, Response } from 'express';
import LeaderboardsService from '../services/leaderboards.service';

export default class LeaderboardsController {
  public getLeaderboardHome = async (req: Request, res: Response) => {
    const leaderboard = await LeaderboardsService.getLeaderboardHome();

    return res.status(200).json(leaderboard);
  };
}
