import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import Token from '../utils/tokenGenerator';
import UserModel from '../database/models/UserModel';

const tokenGenerator = new Token();

class UserService {
  public valiteUser = async (user: IUser) => {
    const userChecked = await UserModel.findOne({ where: { email: user.email } });

    if (!userChecked) return null;

    const passwordChecked = bcrypt.compareSync(user.password, userChecked.password);

    if (!passwordChecked) return null;

    return userChecked;
  };

  public login = async (user: IUser) => {
    await this.valiteUser(user);

    const userChecked = await UserModel.findOne({ where: { email: user.email } });

    return tokenGenerator.generateToken(userChecked as IUser);
  };
}

export default new UserService();
