import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { UserEventStatus } from '../userEvent.typedefs';
import { UserEventRepository } from '../userEvent.repository';
import { EventModel } from '../../../models/EventModel';
import { EventRepository } from '../../event/event.repository';

interface Options {
  eventId: number;
}

export const unsubscribeToEventResolver: AuthResolver<Promise<EventModel>,
  Options> = async (_, { eventId }, ctx) => {
  const userEventRepository = new UserEventRepository(ctx);
  const eventRepository = new EventRepository(ctx);

  const userId = ctx.authUser.id;

  const event = await eventRepository.getById(eventId);

  const userEvent = await userEventRepository.getByUserIdAndEventId({
    userId, eventId,
  });

  await userEventRepository.update(
    userEvent.id,
    { status: UserEventStatus.Canceled }
  );

  return event;
};
