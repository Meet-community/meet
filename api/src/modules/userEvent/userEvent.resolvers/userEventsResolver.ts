import { Ctx } from '../../../../server/typedefs';
import { UserEvent } from '../../../models/UserEvent';

export const userEventsResolver = async (_, __, ctx: Ctx ): Promise<UserEvent[]> => {
  return ctx.models.UserEvent.findAll();
}
