import { userEventsResolver } from './userEventsResolver';
import { makeAuthResolver } from '../../../core/resolvers/makeResolver';
import { userResolver } from './user.resolver';
import { subscribeToEventResolver } from './subscribeToEventResovler';
import { unsubscribeToEventResolver } from './unsubscribeToEventResovler';

export const UserEventResolvers = {
  Query: {
    userEvents: makeAuthResolver(userEventsResolver),
  },

  Mutation: {
    subscribeToEvent: makeAuthResolver(subscribeToEventResolver),
    unsubscribeToEvent: makeAuthResolver(unsubscribeToEventResolver),
  },

  UserEvent: {
    user: makeAuthResolver(userResolver),
  }
};
