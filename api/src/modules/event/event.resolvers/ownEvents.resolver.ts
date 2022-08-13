import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { EventModel } from '../../../models/EventModel';
import { EventRepository } from '../event.repository';

export const ownEventsResolver: AuthResolver<
  Promise<EventModel[]>
> = (_, __, ctx) => {
  const eventRepository = new EventRepository(ctx);
  const creatorId = ctx.authUser.id;

  return eventRepository.getByFilters({ creatorId });
};
