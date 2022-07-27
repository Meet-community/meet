import gql from 'graphql-tag';
import { EVENT_FULL_FRAGMENT } from '../event.fragments/eventFull.fragment';

export const EVENT_QUERY = gql`
  query event($args: EventArgs!) {
    event(args: $args) {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
