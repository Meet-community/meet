import { eventsResolver } from './events.resolver';
import { creatorResolver } from './creator.resolver';
import { participantsResolver } from './participants.resolver';

export const EventResolvers = {
  Query: {
    events: eventsResolver,
  },

  Event: {
    creator: creatorResolver,
    participants: participantsResolver,
  }
};
