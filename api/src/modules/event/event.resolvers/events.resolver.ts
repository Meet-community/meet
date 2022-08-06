import { Ctx } from '../../../server/typedefs';
import { EventModel } from '../../../models/EventModel';
import { Resolver } from '../../../core/resolvers/makeResolver';
import  { Op } from 'sequelize';

export const eventsResolver: Resolver<
  Promise<EventModel[]>
> = async (_, __, ctx: Ctx ) => {
  const today = new Date();

  return ctx.models.EventModel.findAll({
    where: {
      startAt: { [Op.gt]: today }
    },
    order: [['startAt', 'ASC']],
    raw: true,
  });
};
