import { eventsResolver } from './events.resolver';
import { creatorResolver } from './creator.resolver';
import { participantsResolver } from './participants.resolver';
import { eventResolver } from './event.resolver';
import { makeAuthResolver } from '../../../core/resolvers/makeResolver';
import { createEventResolver } from './createEvent.resolver';
import { cityResolver } from './city.resolver';
import { plannedEventsResolver } from './plannedEvents.resolver';
import { archivedEventsResolver } from './archivedEventsResolver';

export const EventResolvers = {
  Query: {
    events: eventsResolver,
    event: eventResolver,
    archivedEvents: makeAuthResolver(archivedEventsResolver),
    plannedEvents: makeAuthResolver(plannedEventsResolver),
  },

  Mutation: {
    createEvent: makeAuthResolver(createEventResolver),
  },

  Event: {
    creator: creatorResolver,
    participants: participantsResolver,
    city: cityResolver,
  },
};
