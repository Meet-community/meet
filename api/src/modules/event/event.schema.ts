import gql from 'graphql-tag';

// TODO: Move Date to init.schema (Sergio)

export const EventSchema = gql`
  type Query {
    events(filters: EventsFilters): [Event!]!
    event(id: Int!): Event!
    plannedEvents: [Event!]!
    archivedEvents: [Event!]!
  }
  
  type Mutation {
    createEvent(args: CreateEventArgs!): Event!
    updateEvent(eventId: Int!, args: UpdateEventArgs!): Event!
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
    status: EventStatus!
    creator: User!
    participants: [User!]!
    city: City!
    cityId: Int!
    googlePlaceId: String
    eventLink: String
  }
  
  enum EventStatus {
    PENDING
    CANCELED
  }
  
  input CreateEventArgs {
    title: String!
    description: String!
    startAt: Date!
    endAt: Date!
    logoFile: Upload
    capacity: Int!
    minCapacity: Int!
    googleCityId: String!
    googlePlaceId: String
    logo: String
    eventLink: String
  }
  
  input EventsFilters {
    googleCityIds: [String!]
  }
  
  input UpdateEventArgs {
    status: EventStatus
  }
  
  scalar Date
`;
