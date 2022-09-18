import { Resolver } from '../../../core/resolvers/makeResolver';
import { TrelloService } from '../../../services/trelloService/trelloService';

interface Options {
  args: {
    feedback: string;
    route: string;
  };
}

export const createFeedbackResolver: Resolver<
  Promise<boolean>,
  Options
> = async (_, { args }, ctx) => {
  const trelloService = new TrelloService();

  await trelloService.createFeedback({
    ...args,
    creatorEmail: ctx.authUser?.email,
    userAgent: ctx.req.headers['user-agent'],
  });

  return true;
};
