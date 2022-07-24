import { usersResolvers } from './users.resolvers';
import { signUpResolver } from './signUp.resolver';
import { activateUserResolver } from './activateUser.resolver';
import { signInResolver } from './signIn.resolver';
import { logOutResolver } from './logOut.resolver';
import { makeAuthResolver } from '../../../core/resolvers/makeResolver';

export const UserResolvers = {
  Query: {
    users: makeAuthResolver(usersResolvers),
  },
  Mutation: {
    signUp: signUpResolver,
    signIn: signInResolver,
    activateUser: activateUserResolver,
    logOut: logOutResolver,
  }
}
