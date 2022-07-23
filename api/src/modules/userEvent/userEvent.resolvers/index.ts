import { userEventResolver } from './userEvent.resolver';

export const UserEventResolvers = {
  Query: {
    userEvent: userEventResolver,
  },
}
