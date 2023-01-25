import { Router } from 'express';
import TokenHandler from '../utils/TokenHandler';
import UserController from '../controllers/user.controller';
import ValidateLogin from '../middlewares/validateLoginFields';

const userController = new UserController();
const validateLogin = new ValidateLogin();
const tokenHandler = new TokenHandler();

class UserRouter {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/', validateLogin.checkingFields, userController.login);
    this.router.get('/validate', tokenHandler.verifyToken, userController.getUserRole);
  }
}

export default new UserRouter();
