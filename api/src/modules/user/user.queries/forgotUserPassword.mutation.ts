import gql from 'graphql-tag';

export const FORGOT_USER_PASSWORD_MUTATION = gql`
  mutation forgotUserPassword($args: ForgotUserPasswordArgs!) {
    forgotUserPassword(args: $args)
  }
`;
