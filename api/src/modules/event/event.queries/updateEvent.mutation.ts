import gql from 'graphql-tag';
import { EVENT_FULL_FRAGMENT } from '../event.fragments/eventFull.fragment';

export const UPDATE_EVENT_MUTATION = gql`
  mutation updateEvent($eventId: Int!, $args: UpdateEventArgs!) {
    updateEvent(eventId: $eventId, args: $args) {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
