import { Ctx } from '../../../../server/typedefs';

export const usersResolvers = (_, __, ctx: Ctx) => {
  return ctx.models.User.findAll();
}
