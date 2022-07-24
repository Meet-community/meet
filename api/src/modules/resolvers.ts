import merge from 'lodash/merge';
import { UserResolvers } from './user/user.resolvers';
import { EventResolvers } from './event/event.resolvers';
import { UserEventResolvers } from './userEvent/userEvent.resolvers';

const ModulesResolvers = [
  UserResolvers,
  EventResolvers,
  UserEventResolvers,
]

export const resolvers = merge(
  ...ModulesResolvers,
);
