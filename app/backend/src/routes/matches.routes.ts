import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import TokenHandler from '../utils/TokenHandler';

const matchesController = new MatchesController();

class MatchesRouter {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/', matchesController.getAll);
    this.router.post('/', TokenHandler.verifyToken, matchesController.createNewMatch);
    this.router.patch('/:id/finish', matchesController.updateStatus);
    this.router.patch('/:id', matchesController.updateMatch);
  }
}

export default new MatchesRouter();
