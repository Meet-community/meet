import { gql } from 'apollo-server-core';

export const UserEventSchema = gql`
  type Query {
    userEvents: [UserEvent!]!
  }
  
  type Mutation {
      createUserEvent(args: CreateUserEventArgs!): UserEvent!
  }
  
  type UserEvent {
    id: Int!
    userId: Int!
    eventId: Int!
    status: UserEventStatus!
    user: User!
  }
  
  input CreateUserEventArgs {
    eventId: Int!
  }
  
  enum UserEventStatus {
    CANCELED
    PENDING
    VIOLATED
  }
`;
