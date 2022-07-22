import merge from 'lodash/merge';
import { UserResolvers } from 'src/modules/user/user.resolvers';
import { NotesResolvers } from 'src/modules/note/notes.resolvers';

const ModulesResolvers = [
  UserResolvers,
  NotesResolvers,
]

export const resolvers = merge(
  ...ModulesResolvers,
);
