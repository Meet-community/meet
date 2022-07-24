import { Resolver } from '../../../core/resolvers/makeResolver';
import { UserEvent } from '../../../models/UserEvent';
import { UserEventStatus } from '../userEvent.typedefs';
import { UserEventRepository } from '../userEvent.repository';

interface Args {
  eventId: number;
}

interface Options {
  args: Args;
}

export const createUserEventResolver: Resolver<
  Promise<UserEvent>,
  Options
> = async (_, options, ctx) => {
  const { eventId } = options.args;
  const userId = ctx.authUser.id;
  const userEventRepository = new UserEventRepository(ctx);

  const existedUserEvent = await userEventRepository.findByUserIdAndEventId({
    userId, eventId,
  })

  if (existedUserEvent) {
    const [, [result]] = await ctx.models.UserEvent.update(
      { status: UserEventStatus.Pending },
      {
        where: { id: existedUserEvent.id },
        returning: true,
      }
    )

    return result;
  }

  return ctx.models.UserEvent.create(
    { userId,  eventId, status: UserEventStatus.Pending },
    { returning: true, raw: true }
  )
}
