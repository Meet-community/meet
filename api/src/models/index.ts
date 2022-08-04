import { User } from './User';
import { EventModel } from './EventModel';
import { UserEvent } from './UserEvent';
import { City } from './City';

export const models = {
  User,
  EventModel,
  UserEvent,
  City,
};

export type Models = typeof models;
