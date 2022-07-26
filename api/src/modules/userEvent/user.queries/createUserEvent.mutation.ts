import gql from 'graphql-tag';
import {
  EVENT_FULL_FRAGMENT
} from '../../event/event.fragments/eventFull.fragment';

export const CREATE_USER_EVENT_MUTATION = gql`
  mutation createUserEvent($args: CreateUserEventArgs!) {
    createUserEvent(args: $args) {
      ...EventFull
    }
  }
  ${EVENT_FULL_FRAGMENT}
`;
