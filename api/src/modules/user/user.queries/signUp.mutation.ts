import gql from 'graphql-tag';
import { USERS_FULL_FRAGMENT } from '../user.fragments/userFull.fragment';

export const SIGN_UP_MUTATION = gql`
  mutation signUp($args: SignUpArgs!) {
    signUp(args: $args) {
      ...UserFull
    }
  }
  ${USERS_FULL_FRAGMENT}
`;
