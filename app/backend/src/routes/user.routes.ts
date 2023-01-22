import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userController = new UserController();

class UserRouter {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/', userController.login);
  }
}

export default new UserRouter();
