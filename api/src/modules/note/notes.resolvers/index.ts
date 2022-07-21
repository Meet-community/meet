import { notesResolvers } from './notes.resolvers';

export const NotesResolvers = {
  Query: {
    notes: notesResolvers,
  },
}
