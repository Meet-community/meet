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
  const { args: updateValues } = mapFields(options);
  const userRepository = new UserRepository(ctx);
  const { authUser } = ctx;

  return userRepository.update(authUser.id, updateValues);
};

function mapFields(options: Options): Options {
  const { firstName, lastName, telegram, instagram, facebook } = options.args;

  return {
    args: {
      ...options.args,
      firstName: firstName?.trim() || undefined,
      lastName: lastName?.trim() || undefined,
      instagram: instagram?.trim() || undefined,
      telegram: telegram?.trim() || undefined,
      facebook: facebook?.trim() || undefined,
    }
  };
}
