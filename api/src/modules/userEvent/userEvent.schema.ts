import { gql } from 'apollo-server-core';

export const UserEventSchema = gql`
  type Query {
    userEvents: [UserEvent!]!
  }
  
  type Mutation {
    subscribeToEvent(eventId: Int!): Event!
    unsubscribeToEvent(eventId: Int!): Event!
  }
  
  type UserEvent {
    id: Int!
    userId: Int!
    eventId: Int!
    status: UserEventStatus!
    user: User!
  }
  
  enum UserEventStatus {
    CANCELED
    PENDING
    VIOLATED
  }
`;
