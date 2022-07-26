import { Resolver } from '../../../core/resolvers/makeResolver';
import { User } from '../../../models/User';
import { UserEventRepository } from '../../userEvent/userEvent.repository';
import { EventModel } from '../../../models/EventModel';

export const participantsResolver: Resolver<
  Promise<User[]>,
  undefined,
  EventModel
> = (event,__, ctx) => {
  const userEventRepository = new UserEventRepository(ctx);

  return userEventRepository.findEventParticipants(event.id);
};
