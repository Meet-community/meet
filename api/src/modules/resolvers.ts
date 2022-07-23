import merge from 'lodash/merge';
import { UserResolvers } from './user/user.resolvers';
import { EventResolvers } from './event/event.resolvers';

const ModulesResolvers = [
  UserResolvers,
  EventResolvers,
]

export const resolvers = merge(
  ...ModulesResolvers,
);
