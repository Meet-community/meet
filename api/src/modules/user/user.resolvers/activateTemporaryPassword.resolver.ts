import { Resolver } from '../../../core/resolvers/makeResolver';
import { UserRepository } from '../user.repository';
import { USER_ERROR } from '../user.constans';
import { UserStatus } from '../user.typedefs';

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
    throw Error(USER_ERROR.InvalidToken);
  }

  if (user.status !== UserStatus.Confirmed) {
    throw Error(USER_ERROR.EmailNotConfirmed);
  }

  if (!user.temporaryPassword) {
    throw Error('bad_request');
  }

  await userRepository.update(
    user.id,
    { password: user.temporaryPassword, token: null, temporaryPassword: null }
  );

  return true;
};
