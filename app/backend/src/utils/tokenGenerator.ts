import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const secret = process.env.JWT_SECRET;
const config: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

export default class Token {
  public generateToken = (user: IUser) => {
    const token = jwt.sign({ ...user }, secret as jwt.Secret, config);
    return token;
  };
}
