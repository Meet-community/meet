import { Ctx } from '../../../../server/typedefs';
import { EventModel } from '../../../models/EventModel';
import { Resolver } from '../../../core/resolvers/makeResolver';
import { EventRepository } from '../user.repository';

interface Options {
 options: {
   id: number;
 };
}

export const eventResolver: Resolver<
  Promise<EventModel>,
  Options,
  EventModel
  > = async (_, { options }, ctx: Ctx): Promise<EventModel> => {
    const eventRepository = new EventRepository(ctx);

    return eventRepository.getById(options.id);
  };
