import { eventsResolver } from './events.resolver';
import { creatorResolver } from './creator.resolver';
import { participantsResolver } from './participants.resolver';
import { eventResolver } from './event.resolver';
import { makeAuthResolver } from '../../../core/resolvers/makeResolver';
import { createEventResolver } from './createEvent.resolver';
import { cityResolver } from './city.resolver';
import { ownEventsResolver } from './ownEvents.resolver';
import { archivedEventsResolver } from './archivedEventsResolver';
import { visitedEventsResolver } from './visitedEvents.resolver';

export const EventResolvers = {
  Query: {
    events: eventsResolver,
    event: eventResolver,
    ownEvents: makeAuthResolver(ownEventsResolver),
    archivedEvents: makeAuthResolver(archivedEventsResolver),
    visitedEvents: makeAuthResolver(visitedEventsResolver),
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
