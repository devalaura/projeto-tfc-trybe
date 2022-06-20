import * as bcrypt from 'bcryptjs';

import UserModel from '../database/models/User';
import Authentication from '../utils/Auth';

export default class User {
  constructor(public auth = new Authentication()) { }

  public async login(email: string, password: string) {
    const findUser = await UserModel.findOne({ where: { email } });
    if (!findUser) throw new Error('user validation');

    const correctPassword = await bcrypt.compare(password, findUser.password);
    if (!correctPassword) throw new Error('user validation');

    const { id, username, role } = findUser;
    const token = await this.auth.generate(id, username);
    return {
      user: {
        id,
        username,
        role,
      },
      token,
    };
  }
}
