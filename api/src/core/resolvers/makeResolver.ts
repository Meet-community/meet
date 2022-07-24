import { GraphQLResolveInfo } from 'graphql';
import { Ctx } from '../../../server/typedefs';
import { USER_ERROR } from '../../modules/user/user.constans';

export type Resolver<Result, Option = undefined, Args = undefined, Parent = undefined> = (
  parent: Parent,
  args: Args,
  ctx: Ctx,
  info: GraphQLResolveInfo,
) => Result;

export const makeAuthResolver = (resolver: Resolver<any, any>): Resolver<any, any> => {
  return (parent, args,ctx, info) => {
    if (!ctx.authUser) {
      throw Error(USER_ERROR.NotAuthorized);
    }

    return resolver(parent, args, ctx, info);
  }
}


