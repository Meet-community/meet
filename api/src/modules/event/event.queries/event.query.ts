import gql from 'graphql-tag';
import { EVENT_FULL_FRAGMENT } from '../event.fragments/eventFull.fragment';

export const EVENT_QUERY = gql`
  query event($id: Int!) {
    event(id: $id) {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
