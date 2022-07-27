import gql from 'graphql-tag';
import {
  EVENT_FULL_FRAGMENT
} from '../../event/event.fragments/eventFull.fragment';

export const SUBSCRIBE_TO_EVENT_MUTATION = gql`
  mutation subscribeToEvent($eventId: Int!) {
    subscribeToEvent(eventId: $eventId) {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
