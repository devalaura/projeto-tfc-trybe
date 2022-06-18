import { SignOptions, sign } from 'jsonwebtoken';
import * as fs from 'fs/promises';

export default class Auth {
  private jwtKeyPath = '../../jwt.evaluation.key';
  private jwtConfig: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  async generate(id: number, username: string) {
    const SECRET = await fs.readFile(this.jwtKeyPath);
    const token = sign({ data: { id, username } }, SECRET, this.jwtConfig);
    return token;
  }
}
