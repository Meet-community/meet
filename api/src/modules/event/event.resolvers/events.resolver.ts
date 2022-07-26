import { Ctx } from '../../../../server/typedefs';
import { EventModel } from '../../../models/EventModel';
import { Resolver } from '../../../core/resolvers/makeResolver';

export const eventsResolver: Resolver<
  Promise<EventModel[]>
> = async (_, __, ctx: Ctx ): Promise<EventModel[]> => {
  return ctx.models.EventModel.findAll({
    order: [['startAt', 'ASC']],
    raw: true,
  });
};
