import gql from 'graphql-tag';

export const CITY_FRAGMENT = gql`
  fragment City on City {
    id
    googleId
    name
  }
`;
