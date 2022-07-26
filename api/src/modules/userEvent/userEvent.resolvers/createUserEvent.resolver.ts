import { AuthResolver } from '../../../core/resolvers/makeResolver';
import { UserEventStatus } from '../userEvent.typedefs';
import { UserEventRepository } from '../userEvent.repository';
import { EventModel } from '../../../models/EventModel';
import { EventRepository } from '../../event/user.repository';

interface Args {
  eventId: number;
  status?: UserEventStatus;
}

interface Options {
  args: Args;
}

export const createUserEventResolver: AuthResolver<Promise<EventModel>,
  Options> = async (_, options, ctx) => {
  const userEventRepository = new UserEventRepository(ctx);
  const eventRepository = new EventRepository(ctx);

  const { eventId, status = UserEventStatus.Pending } = options.args;
  const userId = ctx.authUser.id;

  const event = await eventRepository.getById(eventId);

  const existedUserEvent = await userEventRepository.findByUserIdAndEventId({
    userId, eventId,
  });

  if (existedUserEvent) {
    await ctx.models.UserEvent.update(
      { status },
      {
        where: { id: existedUserEvent.id },
        returning: true,
      }
    );

    return event;
  }

  await ctx.models.UserEvent.create(
    { userId, eventId, status },
    { returning: true, raw: true }
  );

  return event;
};
