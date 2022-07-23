import { Ctx } from '../../../../server/typedefs';

type Result = boolean;

export const logOutResolver = async (
  _, __, { res }: Ctx
): Promise<Result> => {
  res.clearCookie('Authorization');

  return true;
}
