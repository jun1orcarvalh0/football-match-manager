import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import UserService from '../services/user.service';

export default class UsersController {
  public login = async (req: Request, res: Response) => {
    const user = req.body;
    const token = await UserService.login(user as IUser);
    if (!token) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json({ token });
  };

  public getUserRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({ message: 'Token não enviado' });
    }

    const role = await UserService.getUserRole(authorization);

    if (!role) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    return res.status(200).json({ role });
  };
}
