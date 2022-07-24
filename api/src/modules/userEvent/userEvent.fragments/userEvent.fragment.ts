import gql from 'graphql-tag';

export const USER_EVENT_FRAGMENT = gql`
  fragment UserEvent on UserEvent {
    id
    userId
    eventId
    status
  }
`;
