import gql from 'graphql-tag';
import { USERS_FULL_FRAGMENT } from 'src/modules/user/users.fragments/userFull.fragment';

export const USERS_QUERY = gql`
  query users {
    users {
      ...UserFull
    }
  }
  ${USERS_FULL_FRAGMENT}
`;
