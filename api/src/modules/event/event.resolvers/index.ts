import { eventsResolver } from './events.resolver';
import { creatorResolver } from './creator.resolver';

export const EventResolvers = {
  Query: {
    events: eventsResolver,
  },

  Event: {
    creator: creatorResolver,
  }
}
