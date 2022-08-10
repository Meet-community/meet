import { Ctx } from '../../../server/typedefs';
import { EventModel } from '../../../models/EventModel';
import { Resolver } from '../../../core/resolvers/makeResolver';
import { EventRepository } from '../event.repository';

interface EventsFilters {
  filters?: {
    googleCityIds?: number[];
  };
}

export const eventsResolver: Resolver<Promise<EventModel[]>,
  EventsFilters> = async (_, { filters = {} }, ctx: Ctx) => {
  const eventRepository = new EventRepository(ctx);

  return eventRepository.getByFilters(filters);
};

