import { User } from './User';
import { EventModel } from './EventModel';
import { UserEvent } from './UserEvent';

export const models = {
  User,
  EventModel,
  UserEvent,
};

export type Models = typeof models;
