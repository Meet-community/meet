import { User } from '../../../models/User';
import { EventModel } from '../../../models/EventModel';
import { Resolver } from '../../../core/resolvers/makeResolver';
import { UserRepository } from '../../user/user.repository';

export const creatorResolver: Resolver<
  Promise<User>,
  undefined,
  EventModel
> = async (
  event, _, ctx
) => {
  const userRepository = new UserRepository(ctx);

  return userRepository.getById(event.creatorId);
};
