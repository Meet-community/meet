import { Ctx } from 'server/typedefs';

export const notesResolvers = (_, __, ctx: Ctx) => {
  return ctx.models.Note.findAll();
}
