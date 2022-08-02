import gql from 'graphql-tag';

export const USERS_FULL_FRAGMENT = gql`
  fragment UserFull on User {
    id
    firstName
    lastName
    avatar
    email
  }
`;
