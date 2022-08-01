import gql from 'graphql-tag';
import { USERS_FULL_FRAGMENT } from '../user.fragments/userFull.fragment';

export const UPDATE_USER_AVATAR_MUTATION = gql`
  mutation updateUserAvatar($args: UpdateUserAvatarArgs!) {
    updateUserAvatar(args: $args) {
      ...UserFull
    }
  }
  ${USERS_FULL_FRAGMENT}
`;
