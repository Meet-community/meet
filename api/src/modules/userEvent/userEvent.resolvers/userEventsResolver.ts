import { UserEvent } from '../../../models/UserEvent';
import { Resolver } from '../../../core/resolvers/makeResolver';

export const userEventsResolver: Resolver<
  Promise<UserEvent[]>
> = async (_, __, ctx) => {
  return ctx.models.UserEvent.findAll();
};
