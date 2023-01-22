import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import Token from '../utils/tokenGenerator';
import UserModel from '../database/models/UserModel';

const tokenGenerator = new Token();

class UserService {
  public login = async (user: IUser): Promise<string | null> => {
    const userChecked = await UserModel.findOne({ where: { email: user.email } });

    if (!userChecked) {
      return null;
    }

    const passwordChecked = bcrypt.compareSync(user.password, userChecked.password);

    if (!passwordChecked) return null;

    return tokenGenerator.generateToken(userChecked as IUser);
  };
}

export default new UserService();
