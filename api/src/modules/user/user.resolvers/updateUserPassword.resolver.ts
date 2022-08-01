import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { User } from '../../../models/User';
import { hashService } from '../../../services/hashService/hashService';
import { USER_ERROR } from '../user.constans';
import { UserRepository } from '../user.repository';

interface Options {
  args: {
    newPassword: string;
    oldPassword: string;
  };
}

export const updateUserPasswordResolver: AuthResolver<
  Promise<User>,
  Options
  > = async (_, options, ctx) => {
  const { oldPassword, newPassword } = options.args;
  const userRepository = new UserRepository(ctx);
  const { authUser } = ctx;

  const comparePassword = await hashService.comparePassword(
    oldPassword,
    authUser.password
  );

  if (!comparePassword) {
    throw Error(USER_ERROR.InvalidPassword);
  }

  const password = await hashService.hashPassword(newPassword);

  return userRepository.update(authUser.id, { password });
};
