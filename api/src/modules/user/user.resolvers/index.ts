import { usersResolvers } from 'src/modules/user/user.resolvers/users.resolvers';
import { userNameResolver } from 'src/modules/user/user.resolvers/userName.resolver';

export const UserResolvers = {
  Query: {
    users: usersResolvers,
  },
  User: {
    userName: userNameResolver,
  }
}
