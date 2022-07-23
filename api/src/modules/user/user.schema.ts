import { gql } from 'apollo-server-core';

export const UserSchema = gql`
  
  type Query {
    users: [User!]!
  }
  
  type User {
    id: Int!
    firstName: String!
    lastName: String!
  }

`
