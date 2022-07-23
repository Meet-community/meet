import { gql } from 'apollo-server-core';

export const UserEventSchema = gql`
  type Query {
    userEvent: [UserEvent!]!
  }
  
  type UserEvent {
    id: Int!
    userId: Int!
    eventId: Int!
    status: UserEventStatus!
    user: User!
    event: EventModel!
  }
  
  enum UserEventStatus {
    CANCELED
    PENDING
    VIOLATED
  }
`;
