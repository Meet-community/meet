import { User } from './User';
import { EventModel } from './EventModel';
import { UserEvents } from './UserEvents';

export const models = {
  User,
  EventModel,
  UserEvents,
};

export type Models = typeof models;
