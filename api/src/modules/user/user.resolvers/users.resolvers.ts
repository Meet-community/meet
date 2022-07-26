import { Resolver } from '../../../core/resolvers/makeResolver';
import { User } from '../../../models/User';

export const usersResolvers: Resolver<
  Promise<User[]>
> = (_, __, ctx) => {
  return ctx.models.User.findAll();
};
