import { Sequelize } from 'sequelize';
import * as config from '../config/database';

import User from './User';
import Team from './Team';
import Match from './Match';

export { User, Team, Match };
export default new Sequelize(config);
