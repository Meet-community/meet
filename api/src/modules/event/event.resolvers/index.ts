import { eventsResolver } from './events.resolver';
import { creatorResolver } from './creator.resolver';
import { participantsResolver } from './participants.resolver';
import { eventResolver } from './event.resolver';

export const EventResolvers = {
  Query: {
    events: eventsResolver,
    event: eventResolver,
  },

  Mutation: {},

  Event: {
    creator: creatorResolver,
    participants: participantsResolver,
  },
};
