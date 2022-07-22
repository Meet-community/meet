import gql from 'graphql-tag';
import { USERS_FULL_FRAGMENT } from '../users.fragments/userFull.fragment';

export const USERS_QUERY = gql`
  query users {
    users {
      ...UserFull
    }
  }
  ${USERS_FULL_FRAGMENT}
`;
