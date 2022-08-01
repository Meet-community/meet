import { signUpResolver } from './signUp.resolver';
import { activateUserResolver } from './activateUser.resolver';
import { signInResolver } from './signIn.resolver';
import { logOutResolver } from './logOut.resolver';
import { authUserResolver } from './authUser.resolver';
import { makeAuthResolver } from '../../../core/resolvers/makeResolver';
import { updateUserAvatarResolver } from './updateUserAvatar.resolver';

export const UserResolvers = {
  Query: {
    authUser: authUserResolver,
  },
  Mutation: {
    signUp: signUpResolver,
    signIn: signInResolver,
    activateUser: activateUserResolver,
    logOut: logOutResolver,
    updateUserAvatar: makeAuthResolver(updateUserAvatarResolver),
  }
};
