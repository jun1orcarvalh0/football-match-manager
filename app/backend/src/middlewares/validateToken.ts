import { Request, Response, NextFunction } from 'express';
import Token from '../utils/tokenGenerator';

const tokenHandler = new Token();

export default class ValidateToken {
  public checkingToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({ message: 'Token não enviado' });
    }

    const verifiedToken = tokenHandler.verifyToken(authorization);

    if (!verifiedToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    return next();
  };
}
