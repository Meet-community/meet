import { Resolver } from '../../../core/resolvers/makeResolver';
import { User } from '../../../models/User';
import { UserEvent } from '../../../models/UserEvent';
import { UserRepository } from '../../user/user.repository';

export const userResolver: Resolver<
  Promise<User>,
  undefined,
  UserEvent
> = (userEvent, __, ctx) => {
  const userRepository = new UserRepository(ctx);

  return userRepository.getById(userEvent.userId);
}
