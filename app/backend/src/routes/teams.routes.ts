import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsController = new TeamsController();

class TeamsRouter {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/', teamsController.getAll);
    this.router.get('/:id', teamsController.getById);
  }
}

export default new TeamsRouter();
