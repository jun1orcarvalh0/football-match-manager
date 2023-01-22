import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UsersController {
  public login = async (req: Request, res: Response) => {
    const user = req.body;
    const token = await UserService.login(user);
    return res.status(200).json({ token });
  };
}
