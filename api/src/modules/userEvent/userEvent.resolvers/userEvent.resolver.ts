import { Ctx } from '../../../../server/typedefs';
import { UserEvents } from 'src/models/UserEvents';

export const userEventResolver = async (_, __, ctx: Ctx ): Promise<UserEvents[]> => {
  return ctx.models.UserEvents.findAll();
}
