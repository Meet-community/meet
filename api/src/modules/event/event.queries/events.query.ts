import gql from 'graphql-tag';
import { EVENT_FULL_FRAGMENT } from '../event.fragments/eventFull.fragment';

export const USERS_QUERY = gql`
  query events {
    events {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
