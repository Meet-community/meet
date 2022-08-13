import gql from 'graphql-tag';
import { EVENT_FULL_FRAGMENT } from '../event.fragments/eventFull.fragment';

export const OWN_EVENTS_QUERY = gql`
  query plannedEvents {
    plannedEvents {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
