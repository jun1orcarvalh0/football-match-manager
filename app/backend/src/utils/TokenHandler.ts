import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const secret = process.env.JWT_SECRET;
const config: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

export default class TokenHandler {
  public generateToken = (user: IUser): string => {
    const token = jwt.sign({ ...user }, secret as jwt.Secret, config);
    return token;
  };

  public verifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(400).json({ message: 'Token not found' });
    }

    jwt.verify(token, secret as jwt.Secret, (err, user) => {
      if (err) return res.status(401).json({ message: 'Token must be a valid token' });

      req.body = { ...req.body, user };

      return next();
    });
  };
}
