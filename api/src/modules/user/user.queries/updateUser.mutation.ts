import gql from 'graphql-tag';
import { USERS_FULL_FRAGMENT } from '../user.fragments/userFull.fragment';

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($args: UpdateUserArgs!) {
    updateUser(args: $args) {
      ...UserFull
    }
  }
  ${USERS_FULL_FRAGMENT}
`;
