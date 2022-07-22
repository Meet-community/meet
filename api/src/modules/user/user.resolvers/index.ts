import { usersResolvers } from './users.resolvers';
import { userNameResolver } from './userName.resolver';

export const UserResolvers = {
  Query: {
    users: usersResolvers,
  },
  User: {
    userName: userNameResolver
  }
}
