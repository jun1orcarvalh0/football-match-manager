import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import UserService from '../services/user.service';

export default class UsersController {
  public login = async (req: Request, res: Response) => {
    const token = await UserService.login(req.body as IUser);

    if (!token) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json({ token });
  };

  public getUserRole = async (req: Request, res: Response) => {
    const { user: { userWithoutPassword: { role } } } = req.body;
    res.status(200).json({ role });
  };
}
