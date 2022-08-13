import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { EventModel } from '../../../models/EventModel';
import { EventRepository } from '../event.repository';

export const plannedEventsResolver: AuthResolver<
  Promise<EventModel[]>
> = (_, __, ctx) => {
  const eventRepository = new EventRepository(ctx);
  const userId = ctx.authUser.id;

  return eventRepository.getPlannedEvents({ userId });
};
