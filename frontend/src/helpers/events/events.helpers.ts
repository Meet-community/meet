import { EventsTabs } from './events.typedefs';
import { EventsAll } from '../../components/Events/EventsAll/EventsAll';
import {
  EventsPlanned,
} from '../../components/Events/EventsPlanned/EventsPlanned';
import {
  EventsArchived,
} from '../../components/Events/EventsArchived/EventsArchived';

export const getEventsPageByTab = (tab: EventsTabs) => {
  switch (tab) {
    case EventsTabs.All:
      return EventsAll;

    case EventsTabs.Planned:
      return EventsPlanned;

    case EventsTabs.Archived:
      return EventsArchived;

    default:
      return EventsAll;
  }
};
