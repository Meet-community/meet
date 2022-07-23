import { Ctx } from '../../../../server/typedefs';
import { EventModel } from '../../../models/EventModel';

export const eventsResolver = async (_, __, ctx: Ctx ): Promise<EventModel[]> => {
  console.log('----------------auth----------')
  console.log(ctx.authUser);
  console.log('----------------auth----------')

  return ctx.models.EventModel.findAll({
    order: [['startAt', 'ASC']],
    raw: true,
  })
}
