import { UserStatus } from '../user.typedefs';
import { User } from '../../../models/User';
import { Resolver } from '../../../core/resolvers/makeResolver';
import { jwtService } from '../../../services/jwtService/jwtService';
import {
  ClientError,
  ClientErrorTypes
} from '../../../core/ClientError/ClientError';
import { USER_ERROR } from '../user.constans';

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
    throw new ClientError({
      type: ClientErrorTypes.BadRequest,
      message: USER_ERROR.InvalidToken,
      fields: { token }
    });
  }

  [,[user]] = await ctx.models.User.update(
    { status: UserStatus.Confirmed, token: null },
    { where: { id: user.id }, returning: true }
  );

  const jwt = jwtService.generateAccessToken(user);

  ctx.res.cookie('Authorization', jwt, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });

  return user;
};
