import gql from 'graphql-tag';
import { USERS_FULL_FRAGMENT } from '../user.fragments/userFull.fragment';

export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation updateUserPassword($args: UpdateUserPasswordArgs!) {
    updateUserPassword(args: $args) {
      ...UserFull
    }
  }
  ${USERS_FULL_FRAGMENT}
`;
