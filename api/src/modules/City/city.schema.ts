import { gql } from 'apollo-server-core';

export const CitySchema = gql`
  type City {
    id: Int!
    name: String!
    googleId: String!
    createdAt: Date
    updatedAt: Date
  }
`;
