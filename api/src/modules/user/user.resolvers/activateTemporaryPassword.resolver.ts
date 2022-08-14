import { Resolver } from '../../../core/resolvers/makeResolver';
import { UserRepository } from '../user.repository';
import { USER_ERROR } from '../user.constans';
import { UserStatus } from '../user.typedefs';
import {
  ClientError,
  ClientErrorTypes
} from '../../../core/ClientError/ClientError';

interface Options {
  token: string;
}

export const activateTemporaryPasswordResolver: Resolver<
  Promise<boolean>,
  Options
> = async (_, { token }, ctx) => {
  const userRepository = new UserRepository(ctx);

  const user = await ctx.models.User.findOne({
    where: { token },
    raw: true,
  });

  if (!user) {
    throw new ClientError({
      type: ClientErrorTypes.BadRequest,
      message: USER_ERROR.InvalidToken,
      fields: { token }
    });
  }

  if (user.status !== UserStatus.Confirmed) {
    throw new ClientError({
      type: ClientErrorTypes.BadRequest,
      message: USER_ERROR.EmailNotConfirmed,
      fields: { email: user.email },
    });
  }

  if (!user.temporaryPassword) {
    throw new ClientError({
      type: ClientErrorTypes.NotFound,
      message: USER_ERROR.TemporaryPasswordNotFound,
      fields: { userId: user.id },
    });

  }

  await userRepository.update(
    user.id,
    { password: user.temporaryPassword, token: null, temporaryPassword: null }
  );

  return true;
};
