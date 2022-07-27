import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { UserEventStatus } from '../userEvent.typedefs';
import { UserEventRepository } from '../userEvent.repository';
import { EventModel } from '../../../models/EventModel';
import { EventRepository } from '../../event/event.repository';

interface Options {
  eventId: number;
}

export const subscribeToEventResolver: AuthResolver<Promise<EventModel>,
  Options> = async (_, { eventId }, ctx) => {
  const userEventRepository = new UserEventRepository(ctx);
  const eventRepository = new EventRepository(ctx);

  const userId = ctx.authUser.id;

  const event = await eventRepository.getById(eventId);

  const existedUserEvent = await userEventRepository.findByUserIdAndEventId({
    userId, eventId,
  });

  if (existedUserEvent) {
    await ctx.models.UserEvent.update(
      { status: UserEventStatus.Pending },
      {
        where: { id: existedUserEvent.id },
        returning: true,
      }
    );

    return event;
  }

  await ctx.models.UserEvent.create(
    { userId, eventId, status: UserEventStatus.Pending },
    { returning: true, raw: true }
  );

  return event;
};
