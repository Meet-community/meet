import gql from 'graphql-tag';
import { EVENT_FULL_FRAGMENT } from '../event.fragments/eventFull.fragment';

export const VISITED_EVENTS_QUERY = gql`
  query visitedEvents {
    visitedEvents {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
