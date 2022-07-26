import { User } from '../../../models/User';
import { EventModel } from '../../../models/EventModel';
import { Resolver } from '../../../core/resolvers/makeResolver';

export const creatorResolver: Resolver<
  Promise<User>,
  undefined,
  EventModel
> = async (
  event, _, ctx
) => {
  const user = await ctx.models.User.findByPk(event.creatorId);

  if (!user) {
    throw Error('user_not_found');
  }

  return user;
};
