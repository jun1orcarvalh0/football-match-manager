import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import Token from '../utils/tokenGenerator';
import UserModel from '../database/models/UserModel';

const tokenHandler = new Token();

class UserService {
  public login = async (user: IUser): Promise<string | null> => {
    const userChecked = await UserModel.findOne({ where: { email: user.email } });

    if (!userChecked) {
      return null;
    }

    const passwordChecked = bcrypt.compareSync(user.password, userChecked.dataValues.password);

    if (!passwordChecked) return null;

    const { password: _, ...userWithoutPassword } = userChecked.dataValues;

    return tokenHandler.generateToken(userWithoutPassword as IUser);
  };

  public getUserRole = async (authorization: string) => {
    const tokenVerified = tokenHandler.verifyToken(authorization);

    if (!tokenVerified) {
      return null;
    }

    return tokenVerified;
  };
}

export default new UserService();
