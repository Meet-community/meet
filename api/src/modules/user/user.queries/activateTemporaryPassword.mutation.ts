import gql from 'graphql-tag';

export const ACTIVATE_TEMPORARY_PASSWORD_MUTATION = gql`
  mutation activateTemporaryPassword($token: String!) {
    activateTemporaryPassword(token: $token)
  }
`;
