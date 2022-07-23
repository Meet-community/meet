import { Ctx } from '../../../../server/typedefs';
import { User } from '../../../models/User';
import { EventModel } from '../../../models/EventModel';

export const creatorResolver = async (
  event: EventModel, _, ctx: Ctx
): Promise<User> => {
  const user = await ctx.models.User.findByPk(event.creatorId);

  if (!user) {
    throw Error('user_not_found');
  }

  return user;
}
