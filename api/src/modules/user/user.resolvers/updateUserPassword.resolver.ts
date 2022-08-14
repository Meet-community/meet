import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { User } from '../../../models/User';
import { hashService } from '../../../services/hashService/hashService';
import { UserRepository } from '../user.repository';
import {
  ClientError,
  ClientErrorTypes
} from '../../../core/ClientError/ClientError';
import { USER_ERROR } from '../user.constans';

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
    throw new ClientError({
      type: ClientErrorTypes.BadRequest,
      message: USER_ERROR.InvalidPassword,
    });
  }

  const password = await hashService.hashPassword(newPassword);

  return userRepository.update(authUser.id, { password });
};
