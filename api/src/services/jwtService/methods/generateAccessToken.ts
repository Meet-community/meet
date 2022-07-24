import { User } from '../../../models/User';
import jwt from 'jsonwebtoken';
import { normalizeUser } from './normalizeUser';
import { JwtUser } from '../jwt.typedefs';



export const generateAccessToken = (user: User) => {
  const secret = process.env.JWT_ACCESS_SECRET as string;
  const normalizedUser: JwtUser = normalizeUser(user);

  return jwt.sign(normalizedUser, secret, { expiresIn: '7d' })
}
