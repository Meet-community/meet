import { User } from 'src/models/User';
import { Note } from 'src/models/Note';

export const models = {
  User,
  Note,
};

export type Models = typeof models;
