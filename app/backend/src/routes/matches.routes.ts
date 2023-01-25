import { Router } from 'express';
import ValidateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/matches.controller';

const validateToken = new ValidateToken();

const matchesController = new MatchesController();

class MatchesRouter {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/', matchesController.getAll);
    this.router.post('/', validateToken.checkingToken, matchesController.createNewMatch);
    this.router.patch('/:id/finish', matchesController.updateStatus);
  }
}

export default new MatchesRouter();
