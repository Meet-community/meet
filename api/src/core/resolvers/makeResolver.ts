import { GraphQLResolveInfo } from 'graphql';
import { AuthCtx, Ctx } from '../../server/typedefs';
import { ClientError, ClientErrorTypes } from '../ClientError/ClientError';

export type Resolver<Result, Options = undefined, Parent = undefined> = (
  parent: Parent,
  args: Options,
  ctx: Ctx,
  info: GraphQLResolveInfo,
) => Result;

export type AuthResolver<Result, Options = undefined, Parent = undefined> = (
  parent: Parent,
  args: Options,
  ctx: AuthCtx,
  info: GraphQLResolveInfo,
) => Result;

export const makeAuthResolver = (
  resolver: AuthResolver<any, any, any>
): AuthResolver<any, any> => {
  return (parent, args,ctx, info) => {
    if (!ctx.authUser) {
      throw new ClientError({
        type: ClientErrorTypes.Unauthorized
      });
    }

    return resolver(parent, args, ctx, info);
  };
};


