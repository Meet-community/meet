import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { User } from '../../../models/User';
import { UserRepository } from '../user.repository';

interface Options {
  args: {
    firstName?: string;
    lastName?: string;
    instagram?: string;
    telegram?: string;
    facebook?: string;
  };
}

export const updateUserResolver: AuthResolver<Promise<User>,
  Options> = (_, options, ctx) => {
  const userRepository = new UserRepository(ctx);
  const { authUser } = ctx;

  return userRepository.update(authUser.id, options.args);
};
