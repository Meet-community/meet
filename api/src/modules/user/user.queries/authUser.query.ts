import gql from 'graphql-tag';
import { USERS_FULL_FRAGMENT } from '../user.fragments/userFull.fragment';

export const AUTH_USER_QUERY = gql`
  query authUser {
    authUser {
      ...UserFull
    }
  }
  ${USERS_FULL_FRAGMENT}
`;
