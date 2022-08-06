import gql from 'graphql-tag';
import { EVENT_FULL_FRAGMENT } from '../event.fragments/eventFull.fragment';

export const CREATE_EVENT_MUTATION = gql`
  mutation createEvent($args: CreateEventArgs!) {
    createEvent(args: $args) {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
