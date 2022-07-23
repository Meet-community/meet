import gql from 'graphql-tag';
import { USERS_FULL_FRAGMENT } from '../user.fragments/userFull.fragment';

export const SIGN_IN_MUTATION = gql`
  mutation signIn($args: SignInArgs!) {
    signIn(args: $args) {
      ...UserFull
    }
  }
  ${USERS_FULL_FRAGMENT}
`;
