import { JwtPayload } from 'jsonwebtoken';

import User from './User';

export default interface Authentication extends JwtPayload {
  data?: User;
}
