import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { EventModel } from '../../../models/EventModel';
import { EventStatus } from '../event.typedefs';
import { EventRepository } from '../event.repository';
import { removeUndefinedFields } from '../../../helpers/removeUndefinedFields';

interface UpdateArgs {
  status?: EventStatus;

}

interface Options {
  eventId: number;
  args: UpdateArgs;
}

export const updateEventResolver: AuthResolver<
  Promise<EventModel>,
  Options
> = async (_, { eventId, args }, ctx) => {
  const eventRepository = new EventRepository(ctx);
  const authUser = ctx.authUser;
  const event = await eventRepository.getById(eventId);

  if (event.creatorId !== authUser.id) {
    throw Error('Forbidden');
  }

  const preparedArgs = removeUndefinedFields<EventModel>(args);

  return eventRepository.update(eventId, preparedArgs);
};
