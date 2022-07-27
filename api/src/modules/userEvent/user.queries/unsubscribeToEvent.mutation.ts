import gql from 'graphql-tag';
import {
  EVENT_FULL_FRAGMENT
} from '../../event/event.fragments/eventFull.fragment';

export const UNSUBSCRIBE_TO_EVENT_MUTATION = gql`
  mutation unsubscribeToEvent($eventId: Int!) {
    unsubscribeToEvent(eventId: $eventId) {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
