import { User } from '../../../models/User';
import { JwtUser } from '../jwt.typedefs';

export const normalizeUser = ({ email, id }: User): JwtUser => ({
  email, id,
});
