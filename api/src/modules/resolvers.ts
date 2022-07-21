import merge from 'lodash/merge';
import { UserResolvers } from './user/user.resolvers';
import { NotesResolvers } from './note/notes.resolvers';

const ModulesResolvers = [
  UserResolvers,
  NotesResolvers,
]

export const resolvers = merge(
  ...ModulesResolvers,
);
