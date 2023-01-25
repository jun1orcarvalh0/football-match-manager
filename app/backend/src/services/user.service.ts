import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
// import TokenHandler from '../utils/TokenHandler';
import UserModel from '../database/models/UserModel';

const secret = process.env.JWT_SECRET;
const config: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

class UserService {
  public login = async (user: IUser): Promise<string | null> => {
    const userChecked = await this.validateUser(user);

    if (!userChecked) {
      return null;
    }

    // return TokenHandler.generateToken(userChecked.dataValues as IUser);//

    const token = jwt.sign({ ...userChecked }, secret as jwt.Secret, config);
    return token;
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
