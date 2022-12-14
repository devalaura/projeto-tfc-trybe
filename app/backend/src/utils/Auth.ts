import { SignOptions, sign, verify } from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { resolve } from 'path';

import Authorization from '../interfaces/Auth';

// Referência para resolução da leitura do caminho correto: https://stackoverflow.com/questions/44600943/fs-readfilesync-is-not-file-relative-node-js

export default class Auth {
  private jwtKeyPath = '../../jwt.evaluation.key';
  private jwtConfig: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  async generate(id: number, username: string) {
    const SECRET = await fs.readFile(resolve(__dirname, this.jwtKeyPath), { encoding: 'utf8' });
    const token = sign({ data: { id, username } }, SECRET, this.jwtConfig);
    return token;
  }

  async verify(token: string) {
    const SECRET = await fs.readFile(resolve(__dirname, this.jwtKeyPath), { encoding: 'utf8' });
    const verifyToken = verify(token, SECRET);

    return verifyToken as Authorization;
  }
}
