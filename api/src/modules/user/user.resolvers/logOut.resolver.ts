import { Ctx } from '../../../server/typedefs';
import { Resolver } from '../../../core/resolvers/makeResolver';

type Result = boolean;

export const logOutResolver: Resolver<Promise<boolean>> = async (
  _, __, { res }: Ctx
): Promise<Result> => {
  res.clearCookie('Authorization');

  return true;
};
