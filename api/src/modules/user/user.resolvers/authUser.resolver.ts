import { User } from '../../../models/User';
import { Resolver } from '../../../core/resolvers/makeResolver';

export const authUserResolver: Resolver<
  User | null
> = (_,__,ctx) => {
  return ctx.authUser;
}
