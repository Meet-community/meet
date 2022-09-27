import gql from 'graphql-tag';
import {
  USERS_FULL_FRAGMENT
} from '../../user/user.fragments/userFull.fragment';
import { CITY_FRAGMENT } from '../../City/city.fragments/city.fragment';

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
    eventLink
    googlePlaceId
    creator {
      ...UserFull
    }
    participants {
      ...UserFull
    }
    city {
      ...City
    }
  }
  ${USERS_FULL_FRAGMENT}
  ${CITY_FRAGMENT}
`;
