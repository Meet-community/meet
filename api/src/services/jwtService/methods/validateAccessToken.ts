import jwt from 'jsonwebtoken';
import { JwtUser } from '../jwt.typedefs';
import { ENV, getEnvVariable } from '../../../helpers/getEnvVariable';

export const validateAccessToken = (token: string): JwtUser | null => {
  try {
    const secret = getEnvVariable(ENV.JWTAccessSecret);

    return jwt.verify(token, secret) as JwtUser;
  } catch (e) {
    return null;
  }

};
