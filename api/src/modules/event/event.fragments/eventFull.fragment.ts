import gql from 'graphql-tag';
import {
  USERS_FULL_FRAGMENT
} from '../../user/user.fragments/userFull.fragment';

export const EVENT_FULL_FRAGMENT = gql`
  fragment EventFull on Event {
    id
    creatorId
    title
    description
    startAt
    endAt
    logo
    capacity
    minCapacity
    status
    creator {
      ...UserFull
    }
  }
  ${USERS_FULL_FRAGMENT}
`
