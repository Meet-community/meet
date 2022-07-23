import jwt from 'jsonwebtoken';
import { JwtUser } from '../jwt.typedefs';

export const validateAccessToken = (token: string): JwtUser | null => {
  try {
    const secret = process.env.JWT_ACCESS_SECRET as string;

    return jwt.verify(token, secret) as JwtUser
  } catch (e) {
    return null;
  }

}
