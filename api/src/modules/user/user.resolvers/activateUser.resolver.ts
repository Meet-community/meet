import { Ctx } from '../../../../server/typedefs';
import { UserStatus } from '../user.typedefs';
import { USER_ERROR } from '../user.constans';
import { User } from '../../../models/User';

interface Options {
  token: string
}

export const activateUserResolver = async (
  _, { token }: Options, ctx: Ctx
): Promise<User> => {
  let user = await ctx.models.User.findOne(
    { where: { token, status: UserStatus.Pending } },
  )

  if (!user) {
    throw Error(USER_ERROR.InvalidToken);
  }

  [_,[user]] = await ctx.models.User.update(
    { status: UserStatus.Confirmed, token: null },
    { where: { id: user.id }, returning: true }
  )

  return user;
}
