import { Request, Response, NextFunction } from 'express';

export default class LoginFields {
  public checkingFields = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const validation = email && password;

    if (!validation) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    return next();
  };
}
