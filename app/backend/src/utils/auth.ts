import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';

export default class Auth {
  static async generate(id: number, username: string) {
    const jwtKeyPath = '../../jwt.evaluation.key';
    const SECRET = await fs.readFile(jwtKeyPath);
    const token = jwt.sign({ id, username }, SECRET);
    return token;
  }
}
