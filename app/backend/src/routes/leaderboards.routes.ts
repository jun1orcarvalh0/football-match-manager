import { Router } from 'express';
import LeaderboardsController from '../controllers/leaderboards.controller';
// import TokenHandler from '../utils/TokenHandler';

const leaderboardsController = new LeaderboardsController();

class LeaderboardsRouter {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/home', leaderboardsController.getLeaderboardHome);
    this.router.get('/away', leaderboardsController.getLeaderboardAway);
    this.router.get('/', leaderboardsController.getFullLeaderboard);
  }
}

export default new LeaderboardsRouter();
