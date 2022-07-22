import merge from "lodash/merge";
import { NotesResolvers } from "src/modules/note/notes.resolvers";
import { UserResolvers } from "src/modules/user/user.resolvers";

const ModulesResolvers = [UserResolvers, NotesResolvers];

export const resolvers = merge(
  ...ModulesResolvers
);
