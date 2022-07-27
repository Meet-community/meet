import gql from 'graphql-tag';

// TODO: Move Date to init.schema (Sergio)

export const EventSchema = gql`
  type Query {
    events: [Event!]!
    event(id: Int!): Event!
  }
  
  type Event {
    id: Int!
    creatorId: Int!
    title: String!
    description: String!
    startAt: Date!
    endAt: Date!
    logo: String
    capacity: Int!
    minCapacity: Int!
    status: VacancyStatus!
    creator: User!
    participants: [User!]!
  }
  
  enum VacancyStatus {
    PENDING
    CANCELED
  }
  
  scalar Date
`;
