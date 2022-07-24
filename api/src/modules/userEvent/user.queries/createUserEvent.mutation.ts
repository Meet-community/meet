import gql from 'graphql-tag';
import {
  USERS_FULL_FRAGMENT
} from '../../user/user.fragments/userFull.fragment';
import { USER_EVENT_FRAGMENT } from '../userEvent.fragments/userEvent.fragment';

export const CREATE_USER_EVENT_MUTATION = gql`
  mutation createUserEvent($args: CreateUserEventArgs!) {
    createUserEvent(args: $args) {
      ...UserEvent
      user {
        ...UserFull
      }
    }
  }
  ${USERS_FULL_FRAGMENT}
  ${USER_EVENT_FRAGMENT}
`;
