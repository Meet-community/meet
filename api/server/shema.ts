import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
  }

  type Query {
    users: [User!]!
  }
`;
