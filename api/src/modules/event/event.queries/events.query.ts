import gql from 'graphql-tag';
import { EVENT_FULL_FRAGMENT } from '../event.fragments/eventFull.fragment';

export const USERS_QUERY = gql`
  query events($filters: EventsFilters) {
    events(filters: $filters) {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
