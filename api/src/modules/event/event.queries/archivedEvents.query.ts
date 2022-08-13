import gql from 'graphql-tag';
import { EVENT_FULL_FRAGMENT } from '../event.fragments/eventFull.fragment';

export const ARCHIVED_EVENTS_QUERY = gql`
  query archivedEvents {
    archivedEvents {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
