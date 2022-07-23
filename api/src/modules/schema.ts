import { UserSchema } from './user/user.schema';
import { UserEventSchema } from './userEvent/userEvent.schema';
import { EventSchema } from './event/event.schema';

export const typeDefs = [
  UserSchema,
  EventSchema,
  UserEventSchema,
];
