import { UserStatus } from '../user.typedefs';
import { USER_ERROR } from '../user.constans';
import { User } from '../../../models/User';
import { Resolver } from '../../../core/resolvers/makeResolver';

interface Options {
  token: string;
}

export const activateUserResolver: Resolver<
  Promise<User>,
  Options
> = async (_, { token }, ctx) => {
  let user = await ctx.models.User.findOne(
    { where: { token, status: UserStatus.Pending } },
  );

  if (!user) {
    throw Error(USER_ERROR.InvalidToken);
  }

  [,[user]] = await ctx.models.User.update(
    { status: UserStatus.Confirmed, token: null },
    { where: { id: user.id }, returning: true }
  );

  return user;
};
