import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import Token from '../utils/TokenHandler';
import UserModel from '../database/models/UserModel';

const tokenHandler = new Token();

class UserService {
  public login = async (user: IUser): Promise<string | null> => {
    const userChecked = await this.validateUser(user);

    if (!userChecked) {
      return null;
    }

    return tokenHandler.generateToken(userChecked as IUser);
  };

  public validateUser = async (user: IUser) => {
    const userChecked = await UserModel.findOne({ where: { email: user.email } });

    if (!userChecked) {
      return null;
    }

    const passwordChecked = bcrypt.compareSync(user.password, userChecked.password);

    if (!passwordChecked) {
      return null;
    }

    return userChecked;
  };
}

export default new UserService();
