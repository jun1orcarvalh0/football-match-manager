import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const secret = process.env.JWT_SECRET;
const config: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

interface payload {
  'id': 1,
  'username': string,
  'role': string,
  'email': string,
  'iat': number,
  'exp': number,
}

export default class Token {
  public generateToken = (user: IUser) => {
    const token = jwt.sign(user, secret as jwt.Secret, config);
    return token;
  };

  public verifyToken = (authorization: string) => {
    try {
      const decoded = jwt.verify(authorization, secret as jwt.Secret) as payload;
      return decoded.role;
    } catch (error) {
      return null;
    }
  };
}
