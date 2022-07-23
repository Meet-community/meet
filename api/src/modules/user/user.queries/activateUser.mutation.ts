import gql from 'graphql-tag';
import { USERS_FULL_FRAGMENT } from '../user.fragments/userFull.fragment';

export const ACTIVATE_USER_MUTATION = gql`
  mutation activateUser($token: String!) {
    activateUser(token: $token) {
      ...UserFull
    }
  }
  ${USERS_FULL_FRAGMENT}
`;
