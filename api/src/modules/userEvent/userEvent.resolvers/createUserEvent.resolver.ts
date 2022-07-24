import { Resolver } from '../../../core/resolvers/makeResolver';
import { UserEventStatus } from '../userEvent.typedefs';
import { UserEventRepository } from '../userEvent.repository';
import { EventModel } from '../../../models/EventModel';

interface Args {
  eventId: number;
}

interface Options {
  args: Args;
}

export const createUserEventResolver: Resolver<Promise<EventModel>,
  Options> = async (_, options, ctx) => {
  const { eventId } = options.args;
  const userId = ctx.authUser.id;
  const userEventRepository = new UserEventRepository(ctx);

  const event = await ctx.models.EventModel.findOne(
    {
      where: { id: eventId },
      raw: true,
  })

  const existedUserEvent = await userEventRepository.findByUserIdAndEventId({
    userId, eventId,
  })

  if (existedUserEvent) {
    await ctx.models.UserEvent.update(
      { status: UserEventStatus.Pending },
      {
        where: { id: existedUserEvent.id },
        returning: true,
      }
    )

    return event;
  }

  await ctx.models.UserEvent.create(
    { userId, eventId, status: UserEventStatus.Pending },
    { returning: true, raw: true }
  )

  return event;
}
