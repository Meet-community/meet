import { userEventsResolver } from './userEventsResolver';
import { createUserEventResolver } from './createUserEvent.resolver';
import { makeAuthResolver } from '../../../core/resolvers/makeResolver';
import { userResolver } from './user.resolver';

export const UserEventResolvers = {
  Query: {
    userEvents: makeAuthResolver(userEventsResolver),
  },

  Mutation: {
    createUserEvent: makeAuthResolver(createUserEventResolver),
  },

  UserEvent: {
    user: makeAuthResolver(userResolver),
  }
};
