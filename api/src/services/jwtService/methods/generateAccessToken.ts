import { User } from '../../../models/User';
import jwt from 'jsonwebtoken';
import { normalizeUser } from './normalizeUser';
import { JwtUser } from '../jwt.typedefs';
import { ENV, getEnvVariable } from '../../../helpers/getEnvVariable';



export const generateAccessToken = (user: User) => {
  const secret = getEnvVariable(ENV.JWTAccessSecret);
  const normalizedUser: JwtUser = normalizeUser(user);

  return jwt.sign(normalizedUser, secret, { expiresIn: '7d' });
};
