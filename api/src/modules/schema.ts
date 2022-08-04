import { UserSchema } from './user/user.schema';
import { EventSchema } from './event/event.schema';
import { UserEventSchema } from './userEvent/userEvent.schema';
import { CitySchema } from './City/city.schema';

export const typeDefs = [
  UserSchema,
  EventSchema,
  UserEventSchema,
  CitySchema,
];
