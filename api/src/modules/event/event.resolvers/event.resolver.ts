import { Ctx } from '../../../server/typedefs';
import { EventModel } from '../../../models/EventModel';
import { Resolver } from '../../../core/resolvers/makeResolver';
import { EventRepository } from '../event.repository';

interface Options {
   id: number;
}

export const eventResolver: Resolver<
  Promise<EventModel>,
  Options,
  EventModel
  > = async (_, { id}, ctx: Ctx): Promise<EventModel> => {
    const eventRepository = new EventRepository(ctx);

    return eventRepository.getById(id);
  };
