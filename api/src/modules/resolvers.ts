import merge from 'lodash/merge';
import { UserResolvers } from './user/user.resolvers';
import { EventResolvers } from './event/event.resolvers';
import { UserEventResolvers } from './userEvent/userEvent.resolvers';

export const resolvers = merge(
  UserResolvers,
  EventResolvers,
  UserEventResolvers,
);
