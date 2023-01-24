import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

class MatchesRouter {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/', matchesController.getAll);
  }
}

export default new MatchesRouter();
