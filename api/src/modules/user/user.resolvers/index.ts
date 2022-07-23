import { usersResolvers } from './users.resolvers';

export const UserResolvers = {
  Query: {
    users: usersResolvers,
  },
}
